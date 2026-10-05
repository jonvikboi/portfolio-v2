"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

export default function LocalTime() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: SITE.timeZone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="tabular-nums">
      {time} {SITE.timeZoneLabel}
    </span>
  );
}
