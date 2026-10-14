import type Lenis from "lenis";

let instance: Lenis | null = null;
let locks = 0;

export function setLenis(l: Lenis | null) {
  instance = l;
  if (l && locks > 0) l.stop();
}

export function getLenis() {
  return instance;
}

export function lockScroll() {
  locks++;
  instance?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  if (locks === 0) return;
  locks--;
  if (locks > 0) return;
  instance?.start();
  document.documentElement.style.overflow = "";
}
