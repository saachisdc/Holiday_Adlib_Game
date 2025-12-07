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
  branchMap = null, // optional: { [choiceText]: { insert: string, skipUntil: string } }
}) {
  const [visible, setVisible] = useState("");
  const [paused, setPaused] = useState(false);
  const tokens = Array.isArray(pauseAfter)
    ? pauseAfter
    : pauseAfter
    ? [pauseAfter]
    : [];
  const matchedTokenRef = useRef(null);
  const onPauseRef = useRef(onPause);
  const idx = useRef(0); // current index in source text
  const intervalRef = useRef(null);
  const pausedRef = useRef(false); // mirror so effects can check without retriggering
  const branchInsertRef = useRef("");
  const branchIdxRef = useRef(0);
  const resumePosRef = useRef(null);

  useEffect(() => {
    // keep a ref to the latest onPause so main effect doesn't restart when parent recreates the callback
    onPauseRef.current = onPause;
  }, [onPause]);

  // main typing effect: drives character-by-character typing and pauses when token found
  useEffect(() => {
    // reset state
    setVisible("");
    setPaused(false);
    pausedRef.current = false;
    idx.current = 0;
    matchedTokenRef.current = null;
    clearInterval(intervalRef.current);

    if (!start) return undefined;

    const step = () => {
      // if next characters match a pause token, pause and show placeholder
      if (tokens.length > 0) {
        const matched = tokens.find(
          (t) => t && text.startsWith(t, idx.current)
        );
        if (matched) {
          matchedTokenRef.current = matched;
          clearInterval(intervalRef.current);
          setVisible((v) => v + placeholder);
          setPaused(true);
          pausedRef.current = true;
          if (onPauseRef.current) onPauseRef.current();
          return;
        }
      }

      // if we've consumed all characters, stop (do not call onPause)
      if (idx.current >= text.length) {
        clearInterval(intervalRef.current);
        return;
      }

      // otherwise append next char
      const ch = text.charAt(idx.current);
      setVisible((v) => v + ch);
      idx.current += 1;
    };

    intervalRef.current = setInterval(step, Math.max(1, speed));

    return () => clearInterval(intervalRef.current);
  }, [text, speed, start, placeholder]);

  // when a `choice` arrives while paused, replace placeholder with choice, advance index, and resume
  useEffect(() => {
    if (!choice) return undefined;
    if (!pausedRef.current) return undefined;

    // determine branch map for the matched token (support keys with underscores)
    let branch = null;
    if (branchMap) {
      const matched = matchedTokenRef.current;
      const tokenKey = matched
        ? matched in branchMap
          ? matched
          : matched.replace(/\s+/g, "_")
        : null;
      const tokenMap = tokenKey ? branchMap[tokenKey] : null;
      if (tokenMap) {
        branch = tokenMap[choice] || tokenMap.default || null;
      } else if (branchMap[choice]) {
        // fallback: branchMap keyed directly by choice
        branch = branchMap[choice];
      }
    }

    // replace last placeholder occurrence if present (do NOT append branch.insert yet)
    setVisible((v) => {
      let base = v;
      if (base.endsWith(placeholder)) base = base.slice(0, -placeholder.length);
      // ensure a separating space between existing text and the injected choice
      const sep = base.length > 0 && !/\s$/.test(base) ? " " : "";
      base = base + sep + choice;
      return base;
    });

    // determine resume position after any branch insertion
    if (branch && branch.skipUntil) {
      const resumeAt = text.indexOf(
        branch.skipUntil,
        idx.current +
          (matchedTokenRef.current ? matchedTokenRef.current.length : 0)
      );
      if (resumeAt !== -1) {
        resumePosRef.current = resumeAt;
      } else {
        resumePosRef.current =
          idx.current +
          (matchedTokenRef.current ? matchedTokenRef.current.length : 0);
      }
    } else {
      resumePosRef.current =
        idx.current +
        (matchedTokenRef.current ? matchedTokenRef.current.length : 0);
    }

    // queue branch.insert to be typed character-by-character (if present)
    branchInsertRef.current = branch && branch.insert ? branch.insert : "";
    branchIdxRef.current = 0;

    // if there's no branch insert to type, advance idx now so we don't hit the same pause token again
    if (!branchInsertRef.current) {
      idx.current =
        resumePosRef.current != null
          ? resumePosRef.current
          : idx.current +
            (matchedTokenRef.current ? matchedTokenRef.current.length : 0);
      // avoid duplicating the injected choice if the original text contains it immediately
      if (choice) {
        const nextSlice = text.substr(idx.current, choice.length);
        if (nextSlice === choice) idx.current += choice.length;
      }
    }

    pausedRef.current = false;
    setPaused(false);

    // resume typing: first type branchInsertRef (if any), then continue original text
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      // type branch insert first
      if (
        branchInsertRef.current &&
        branchIdxRef.current < branchInsertRef.current.length
      ) {
        const ch = branchInsertRef.current.charAt(branchIdxRef.current);
        setVisible((v) => v + ch);
        branchIdxRef.current += 1;
        if (branchIdxRef.current >= branchInsertRef.current.length) {
          // finished branch, advance idx to resume position
          branchInsertRef.current = "";
          idx.current =
            resumePosRef.current != null
              ? resumePosRef.current
              : idx.current +
                (matchedTokenRef.current ? matchedTokenRef.current.length : 0);
          // avoid duplicating the injected choice if the original text contains it immediately
          if (choice) {
            const nextSlice = text.substr(idx.current, choice.length);
            if (nextSlice === choice) idx.current += choice.length;
          }
        }
        return;
      }

      if (idx.current >= text.length) {
        clearInterval(intervalRef.current);
        return;
      }

      // if next token occurs immediately, pause again
      if (tokens.length > 0) {
        const nextMatch = tokens.find(
          (t) => t && text.startsWith(t, idx.current)
        );
        if (nextMatch) {
          matchedTokenRef.current = nextMatch;
          clearInterval(intervalRef.current);
          setVisible((v) => v + placeholder);
          setPaused(true);
          pausedRef.current = true;
          if (onPauseRef.current) onPauseRef.current();
          return;
        }
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
