import React, { useEffect, useState, useRef } from "react";

export default function Typewriter({
  text = "",
  speed = 30,
  start = true,
  className = "",
}) {
  const [visible, setVisible] = useState("");
  const idx = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!start) return;
    // reset
    setVisible("");
    idx.current = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      idx.current += 1;
      setVisible(text.slice(0, idx.current));
      if (idx.current >= text.length) {
        clearInterval(intervalRef.current);
      }
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [text, speed, start]);

  return (
    <div className={`story ${className}`}>
      {visible}
      <span className="caret" aria-hidden="true" />
    </div>
  );
}
