export function Arrow({ className = "", direction = "right" }: { className?: string; direction?: "right" | "left" | "up-right" | "down" }) {
  const rotate = { right: 0, left: 180, "up-right": -45, down: 90 }[direction];
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      width="1em"
      height="1em"
    >
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
    </svg>
  );
}

export function Star({ filled = 1, className = "" }: { filled?: number; className?: string }) {
  const id = `star-${Math.round(filled * 100)}`;
  return (
    <svg viewBox="0 0 20 20" width="1em" height="1em" aria-hidden className={className}>
      <defs>
        <linearGradient id={id}>
          <stop offset={`${filled * 100}%`} stopColor="currentColor" />
          <stop offset={`${filled * 100}%`} stopColor="currentColor" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M10 1.5l2.6 5.5 6 .8-4.4 4.1 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8L10 1.5z"
      />
    </svg>
  );
}

export function Drop({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 16" width="0.6em" height="0.8em" aria-hidden className={className}>
      <path d="M6 0C6 0 0 7 0 10.2A6 6 0 0012 10.2C12 7 6 0 6 0z" fill="currentColor" />
    </svg>
  );
}

/** Droplet outline holding a gooseneck spout, with a single drop falling from it. */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={className}>
      <path
        data-mark-outline
        className="qs-mark-line"
        pathLength={1}
        d="M20 2.75C14.4 9.9 8.25 17.3 8.25 24.9a11.75 11.75 0 0 0 23.5 0C31.75 17.3 25.6 9.9 20 2.75Z"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path
        data-mark-arch
        className="qs-mark-line qs-mark-arch"
        pathLength={1}
        d="M13.25 31.25h6.5M16.5 31.25V22.6a4.4 4.4 0 0 1 8.8 0v2.15"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        data-mark-drop
        className="qs-mark-drop"
        d="M25.3 26.9c-.62.82-1 1.42-1 1.95a1 1 0 0 0 2 0c0-.53-.38-1.13-1-1.95Z"
        fill="currentColor"
      />
    </svg>
  );
}

export const Monogram = BrandMark;
