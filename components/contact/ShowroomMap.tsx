"use client";

import { useState } from "react";
import { company } from "@/lib/data";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export default function ShowroomMap() {
  const [interactive, setInteractive] = useState(false);

  return (
    <section className="bg-ink px-gutter py-[12vh] text-ivory">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="eyebrow mb-5 text-sand">(03) Find us</div>
          <h2 className="display text-[clamp(2.6rem,5vw,5rem)]">
            Ferozpur Road, <em className="text-brass-light">Lahore.</em>
          </h2>
        </div>
        <div className="text-[13px] text-sand">{company.coordsLabel}</div>
      </div>

      <div className="relative h-[68vh] min-h-[420px] overflow-hidden bg-ink-soft" onMouseLeave={() => setInteractive(false)}>
        <iframe
          title="Map showing Qureshi Sons, Galaxy Shopping Center, Ferozpur Road, Lahore"
          src={company.mapsEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={cn(
            "absolute inset-0 h-full w-full border-0 [filter:invert(0.92)_hue-rotate(180deg)_grayscale(0.85)_contrast(0.92)_brightness(0.95)]",
            !interactive && "pointer-events-none",
          )}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(26,25,23,0.55)_100%)]" />

        {!interactive && (
          <button
            type="button"
            onClick={() => setInteractive(true)}
            className="absolute inset-0 z-10 flex items-start justify-end p-5"
            aria-label="Enable map interaction"
          >
            <span className="eyebrow rounded-full bg-ink/80 px-4 py-2 text-[10px] text-sand backdrop-blur">Click to explore</span>
          </button>
        )}

        <div className="absolute bottom-5 left-5 z-20 max-w-[min(360px,calc(100%-2.5rem))] bg-ink/90 p-6 backdrop-blur-md md:bottom-8 md:left-8 md:p-8">
          <div className="eyebrow text-brass-light">{company.name}</div>
          <address className="mt-4 text-[14px] not-italic leading-relaxed text-ivory/85">
            {company.addressLines.map((l) => (
              <div key={l}>{l}</div>
            ))}
          </address>
          <div className="mt-6">
            <Button href={company.mapsUrl} external variant="light" magnetic={false}>
              Open in Google Maps
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
