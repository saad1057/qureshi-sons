// Showroom hours in Lahore local time (Asia/Karachi). Only the 8:45 pm closing
// time is confirmed from the Google listing; opening times are assumptions.
export const schedule: Record<number, { open: string; close: string } | null> = {
  0: null,
  1: { open: "10:30", close: "20:45" },
  2: { open: "10:30", close: "20:45" },
  3: { open: "10:30", close: "20:45" },
  4: { open: "10:30", close: "20:45" },
  5: { open: "10:30", close: "20:45" },
  6: { open: "10:30", close: "20:45" },
};

export const scheduleRows = [
  { days: "Monday – Saturday", hours: "10:30 am – 8:45 pm" },
  { days: "Sunday", hours: "Closed" },
];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function format12(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function lahoreNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Karachi",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));
  return {
    day: weekdayIndex,
    minutes: hour * 60 + minute,
    time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
  };
}

export type OpenStatus = {
  open: boolean;
  label: string;
  detail: string;
  time: string;
};

export function getOpenStatus(date = new Date()): OpenStatus {
  const now = lahoreNow(date);
  const today = schedule[now.day];

  if (today) {
    const openAt = toMinutes(today.open);
    const closeAt = toMinutes(today.close);
    if (now.minutes >= openAt && now.minutes < closeAt) {
      return { open: true, label: "Open now", detail: `Closes ${format12(today.close)}`, time: now.time };
    }
    if (now.minutes < openAt) {
      return { open: false, label: "Closed", detail: `Opens ${format12(today.open)}`, time: now.time };
    }
  }

  for (let i = 1; i <= 7; i++) {
    const d = (now.day + i) % 7;
    const next = schedule[d];
    if (next) {
      const when = i === 1 ? "tomorrow" : dayNames[d];
      return { open: false, label: "Closed", detail: `Opens ${when} ${format12(next.open)}`, time: now.time };
    }
  }

  return { open: false, label: "Closed", detail: "", time: now.time };
}
