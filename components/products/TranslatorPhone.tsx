import { cn } from "@/lib/utils";

const BARS = [3, 6, 4, 8, 5, 7, 3, 6, 4, 5];

/** Vivra Translator screen: one line spoken in English, heard in Spanish. */
export function TranslatorPhone({ className }: { className?: string }) {
  return (
    <div className={cn("w-[210px] shrink-0 rounded-[26px] border border-line-strong bg-background p-2 shadow-[0_30px_60px_-28px_rgba(0,0,0,0.55)] sm:w-[236px]", className)} aria-hidden>
      <div className="flex h-[380px] flex-col rounded-[20px] bg-surface p-4">
        <span className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="t-label !text-[9px]">Live</span>
          </span>
          <span className="t-label !text-[9px]">Vivra</span>
        </span>

        <span className="mt-4 flex items-center justify-between rounded-full border border-line px-3 py-1.5 text-[11px] text-secondary">
          <span>English</span>
          <span className="text-tertiary">⇄</span>
          <span>Español</span>
        </span>

        <div className="mt-5 flex flex-1 flex-col gap-3">
          <span className="max-w-[88%] self-start rounded-[14px] rounded-bl-[4px] bg-surface-alt px-3 py-2 text-[12.5px] leading-snug text-primary">
            Where is the nearest station?
          </span>
          <span className="max-w-[88%] self-end rounded-[14px] rounded-br-[4px] bg-brand px-3 py-2 text-[12.5px] leading-snug text-white">
            ¿Dónde está la estación más cercana?
          </span>
        </div>

        <span className="flex items-center justify-between border-t border-line pt-3">
          <span className="flex h-6 items-center gap-[3px]">
            {BARS.map((h, k) => (
              <span key={k} className="wave-bar w-[2.5px] rounded-full bg-brand" style={{ height: h * 2.5, animationDelay: `${(k * 0.11).toFixed(2)}s` }} />
            ))}
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white">
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <rect x="5.5" y="1.5" width="5" height="8.5" rx="2.5" />
              <path d="M3 8a5 5 0 0 0 10 0M8 13v2" />
            </svg>
          </span>
        </span>
      </div>
    </div>
  );
}
