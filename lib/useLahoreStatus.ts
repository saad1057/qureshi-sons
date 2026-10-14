"use client";

import { useSyncExternalStore } from "react";
import { getOpenStatus, type OpenStatus } from "./hours";

let cached: OpenStatus | null = null;
let cacheKey = "";

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 10_000);
  return () => window.clearInterval(id);
}

function getSnapshot() {
  const next = getOpenStatus();
  const key = `${next.time}|${next.label}|${next.detail}`;
  if (key !== cacheKey) {
    cacheKey = key;
    cached = next;
  }
  return cached;
}

function getServerSnapshot() {
  return null;
}

export function useLahoreStatus() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
