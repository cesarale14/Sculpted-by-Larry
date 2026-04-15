"use client";

import { useState } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";

const BAR_HEIGHT_PX = 36;

export function TopChrome() {
  const [barDismissed, setBarDismissed] = useState(false);

  return (
    <>
      {!barDismissed && <AnnouncementBar onDismiss={() => setBarDismissed(true)} />}
      <Navbar topOffset={barDismissed ? 0 : BAR_HEIGHT_PX} />
    </>
  );
}
