import React, { useEffect, useState, useRef } from "react";

export default function Typewriter({
  text = "",
  speed = 30,
  start = true,
  className = "",
  pauseAfter = null, // token to pause at (e.g. 'choose_icon')
  placeholder = "...choose an icon...",
  choice = null, // selected replacement provided by parent
  onPause = null,
}) {
  const [visible, setVisible] = useState("");
  const [paused, setPaused] = useState(false);

  const idx = useRef(0); // current index in source text
  const intervalRef = useRef(null);
  const pausedRef = useRef(false); // mirror so effects can check without retriggering

  // main typing effect: drives character-by-character typing and pauses when token found
  useEffect(() => {
    // reset state
    setVisible("");
    setPaused(false);
    pausedRef.current = false;
    idx.current = 0;
    clearInterval(intervalRef.current);

    if (!start) return undefined;

    const step = () => {
      // if we've consumed all characters, stop
      if (idx.current >= text.length) {
        clearInterval(intervalRef.current);
        return;
      }

      // if a pause token starts at current index, append placeholder and pause
      if (
        pauseAfter &&
        pauseAfter.length > 0 &&
        text.startsWith(pauseAfter, idx.current)
      ) {
        clearInterval(intervalRef.current);
        setVisible((v) => v + placeholder);
        setPaused(true);
        pausedRef.current = true;
        if (onPause) onPause();
        return;
      }

      // otherwise append next char
      const ch = text.charAt(idx.current);
      setVisible((v) => v + ch);
      idx.current += 1;
    };

    intervalRef.current = setInterval(step, Math.max(1, speed));

    return () => clearInterval(intervalRef.current);
  }, [text, speed, start, pauseAfter, placeholder, onPause]);

  // when a `choice` arrives while paused, replace placeholder with choice, advance index, and resume
  useEffect(() => {
    if (!choice) return undefined;
    if (!pausedRef.current) return undefined;

    // replace last placeholder occurrence if present
    setVisible((v) => {
      if (v.endsWith(placeholder))
        return v.slice(0, -placeholder.length) + choice;
      return v + choice;
    });

    // advance index past the token we paused at
    idx.current += pauseAfter ? pauseAfter.length : 0;
    pausedRef.current = false;
    setPaused(false);

    // resume typing from current idx
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (idx.current >= text.length) {
        clearInterval(intervalRef.current);
        return;
      }

      // if next token occurs immediately, pause again
      if (
        pauseAfter &&
        pauseAfter.length > 0 &&
        text.startsWith(pauseAfter, idx.current)
      ) {
        clearInterval(intervalRef.current);
        setVisible((v) => v + placeholder);
        setPaused(true);
        pausedRef.current = true;
        if (onPause) onPause();
        return;
      }

      const ch = text.charAt(idx.current);
      setVisible((v) => v + ch);
      idx.current += 1;
    }, Math.max(1, speed));

    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choice]);

  return (
    <div className={`story ${className}`}>
      {visible}
      <span className="caret" aria-hidden="true" />
    </div>
  );
}
