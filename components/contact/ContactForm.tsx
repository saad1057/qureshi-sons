"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { categories, finishes, products, projects, type CategoryId } from "@/lib/data";
import { Arrow } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "sent";
const contactWays = ["Call", "WhatsApp", "Email"] as const;

function usePrefill() {
  const params = useSearchParams();
  const product = products.find((p) => p.id === params.get("product"));
  const finish = finishes.find((f) => f.id === params.get("finish"));
  const project = projects.find((p) => p.id === params.get("project"));
  if (product) {
    return {
      interests: [product.category] as CategoryId[],
      message: `I'd like to know more about the ${product.name}${finish ? ` in ${finish.name}` : ""}: availability, price and delivery.`,
      context: `${product.name}${finish ? ` · ${finish.name}` : ""}`,
    };
  }
  if (project) {
    return {
      interests: [] as CategoryId[],
      message: `I'm planning a project similar to ${project.title} (${project.type.toLowerCase()}) and would like some advice.`,
      context: project.title,
    };
  }
  return { interests: [] as CategoryId[], message: "", context: "" };
}

export default function ContactForm() {
  const prefill = usePrefill();
  const root = useRef<HTMLDivElement>(null);
  const [interests, setInterests] = useState<CategoryId[]>(prefill.interests);
  const [way, setWay] = useState<(typeof contactWays)[number]>("Call");
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");

  useGSAP(
    () => {
      if (status !== "sent") return;
      gsap.from("[data-sent]", { y: 40, autoAlpha: 0, duration: 1.1, stagger: 0.08, ease: "expo.out" });
    },
    { dependencies: [status], scope: root },
  );

  const toggle = (id: CategoryId) =>
    setInterests((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setName(String(data.get("name") ?? "").split(" ")[0]);
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 1400);
  };

  if (status === "sent") {
    return (
      <div ref={root} className="flex min-h-[520px] flex-col justify-center border-t border-ink/15 pt-10">
        <div data-sent className="eyebrow text-brass">
          Enquiry received
        </div>
        <h3 data-sent className="display mt-6 text-[clamp(2.6rem,4.6vw,4.6rem)]">
          Thank you{name ? `, ${name}` : ""}. <em className="text-brass">We&apos;ll be in touch.</em>
        </h3>
        <p data-sent className="mt-6 max-w-[44ch] text-[15px] leading-relaxed text-ink/70">
          Someone from the showroom will {way === "Email" ? "email" : way === "WhatsApp" ? "message" : "call"} you within one
          working day. This is a demo, so nothing was actually sent.
        </p>
        <button
          data-sent
          type="button"
          onClick={() => setStatus("idle")}
          className="link-line mt-10 inline-flex items-center gap-2 self-start text-[14px] font-medium"
        >
          Send another enquiry <Arrow />
        </button>
      </div>
    );
  }

  return (
    <div ref={root}>
      <form onSubmit={onSubmit} className="border-t border-ink/15 pt-8" aria-label="Enquiry form">
        {prefill.context && (
          <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-stone px-4 py-2 text-[12px]">
            <span className="size-1.5 rounded-full bg-brass" />
            Enquiring about <span className="font-medium">{prefill.context}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
          <Field label="Your name" name="name" required autoComplete="name" />
          <Field label="Phone" name="phone" type="tel" required autoComplete="tel" placeholder="03xx xxxxxxx" />
          <Field label="Email" name="email" type="email" autoComplete="email" optional className="sm:col-span-2" />
        </div>

        <fieldset className="mt-10">
          <legend className="eyebrow mb-4 text-taupe">I&apos;m interested in</legend>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const on = interests.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(c.id)}
                  className={cn(
                    "h-10 rounded-full border px-4 text-[13px] transition-colors duration-300",
                    on ? "border-ink bg-ink text-ivory" : "border-ink/20 hover:border-ink/60",
                  )}
                >
                  {c.short}
                </button>
              );
            })}
          </div>
          <input type="hidden" name="interests" value={interests.join(",")} />
        </fieldset>

        <label className="mt-10 block">
          <span className="eyebrow mb-3 block text-taupe">Message</span>
          <textarea
            name="message"
            rows={4}
            defaultValue={prefill.message}
            placeholder="Tell us about your bathroom, your timeline or the piece you have in mind."
            className="w-full resize-none border-b border-ink/25 bg-transparent pb-3 text-[16px] leading-relaxed outline-none transition-colors placeholder:text-ink/35 focus:border-brass"
          />
        </label>

        <fieldset className="mt-10">
          <legend className="eyebrow mb-4 text-taupe">Best way to reach you</legend>
          <div className="flex gap-6">
            {contactWays.map((w) => (
              <label key={w} className="flex cursor-pointer items-center gap-2.5 text-[14px]">
                <input
                  type="radio"
                  name="contact"
                  value={w}
                  checked={way === w}
                  onChange={() => setWay(w)}
                  className="peer sr-only"
                />
                <span className="grid size-4 place-items-center rounded-full border border-ink/40 peer-checked:border-ink peer-focus-visible:ring-2 peer-focus-visible:ring-brass">
                  <span className={cn("size-2 rounded-full bg-ink transition-transform", way === w ? "scale-100" : "scale-0")} />
                </span>
                {w}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[36ch] text-[12px] leading-relaxed text-taupe">
            We only use your details to reply to this enquiry. No newsletters.
          </p>
          <button
            type="submit"
            disabled={status === "sending"}
            className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-ink px-8 text-[13px] font-medium text-ivory disabled:cursor-wait"
          >
            <span
              aria-hidden
              className="absolute inset-0 translate-y-[101%] rounded-full bg-brass transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0"
            />
            <span className="relative">{status === "sending" ? "Sending…" : "Send enquiry"}</span>
            <span className={cn("relative", status === "sending" && "animate-pulse")}>
              <Arrow />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  optional,
  className,
  ...input
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; optional?: boolean }) {
  return (
    <label className={cn("block", className)}>
      <span className="eyebrow mb-3 flex justify-between text-taupe">
        {label}
        {optional ? <span className="normal-case tracking-normal text-taupe/70">Optional</span> : input.required ? <span aria-hidden>*</span> : null}
      </span>
      <input
        {...input}
        className="w-full border-b border-ink/25 bg-transparent pb-3 text-[17px] outline-none transition-colors placeholder:text-ink/30 focus:border-brass"
      />
    </label>
  );
}
