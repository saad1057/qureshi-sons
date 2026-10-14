"use client";

import { cn } from "@/lib/cn";
import { useLahoreStatus } from "@/lib/useLahoreStatus";

export function StatusDot({ open, className }: { open: boolean | undefined; className?: string }) {
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)}>
      {open && <span className="absolute inset-0 animate-ping rounded-full bg-[#9fbf8f] opacity-60" />}
      <span className={cn("relative inline-flex h-2 w-2 rounded-full", open ? "bg-[#9fbf8f]" : "bg-sand")} />
    </span>
  );
}

export function LiveStatus({ className, showTime = false }: { className?: string; showTime?: boolean }) {
  const status = useLahoreStatus();
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <StatusDot open={status?.open} />
      <span>
        {status ? status.label : "Showroom"}
        <span className="opacity-60"> · {status ? status.detail : "Ferozpur Road"}</span>
        {showTime && status && <span className="opacity-60"> · Lahore {status.time}</span>}
      </span>
    </span>
  );
}
