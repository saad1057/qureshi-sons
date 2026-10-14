import TLink from "./TLink";
import Magnetic from "./Magnetic";
import { Arrow } from "./Icons";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "light" | "brass" | "ghost-light";

const styles: Record<Variant, { base: string; fill: string; hoverText: string }> = {
  solid: { base: "bg-ink text-ivory", fill: "bg-brass", hoverText: "group-hover:text-ivory" },
  outline: { base: "border border-ink/25 text-ink", fill: "bg-ink", hoverText: "group-hover:text-ivory" },
  light: { base: "bg-ivory text-ink", fill: "bg-brass", hoverText: "group-hover:text-ivory" },
  brass: { base: "bg-brass text-ivory", fill: "bg-ivory", hoverText: "group-hover:text-ink" },
  "ghost-light": { base: "border border-ivory/30 text-ivory", fill: "bg-ivory", hoverText: "group-hover:text-ink" },
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  arrow?: boolean;
  magnetic?: boolean;
};

export default function Button({
  href,
  children,
  variant = "solid",
  external,
  className,
  arrow = true,
  magnetic = true,
}: Props) {
  const s = styles[variant];
  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-[101%] rounded-full transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0",
          s.fill,
        )}
      />
      <span className={cn("relative z-10 transition-colors duration-500", s.hoverText)}>{children}</span>
      {arrow && (
        <span className={cn("relative z-10 block h-[1em] w-[1em] overflow-hidden transition-colors duration-500", s.hoverText)}>
          <span className="absolute inset-0 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-full">
            <Arrow />
          </span>
          <span className="absolute inset-0 -translate-x-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0">
            <Arrow />
          </span>
        </span>
      )}
    </>
  );

  const cls = cn(
    "group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full px-6 text-[13px] font-medium tracking-[0.02em]",
    s.base,
    className,
  );

  const el = external ? (
    <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {inner}
    </a>
  ) : (
    <TLink href={href} className={cls}>
      {inner}
    </TLink>
  );

  return magnetic ? <Magnetic strength={0.25}>{el}</Magnetic> : el;
}
