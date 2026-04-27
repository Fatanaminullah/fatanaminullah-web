"use client";

import { useEffect, useState } from "react";

function formatJktTime(): string {
  const now = new Date();
  const jkt = new Date(
    now.getTime() + (now.getTimezoneOffset() + 7 * 60) * 60000,
  );
  const hh = String(jkt.getHours()).padStart(2, "0");
  const mm = String(jkt.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function useJktClock() {
  const [time, setTime] = useState(formatJktTime);

  useEffect(() => {
    const tick = () => setTime(formatJktTime());
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return time;
}
