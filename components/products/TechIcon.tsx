export type TechKey = "ai" | "rtc" | "speech" | "cloud" | "mobile" | "automation" | "data" | "comms" | "faith" | "productivity" | "utilities";

const PATHS: Record<TechKey, React.ReactNode> = {
  ai: (
    <>
      <path d="M8 1.5l1.6 4.9 4.9 1.6-4.9 1.6L8 14.5l-1.6-4.9L1.5 8l4.9-1.6z" />
    </>
  ),
  rtc: (
    <>
      <path d="M1.5 8h2l1.5-4 2.5 8 2-6 1.5 2h3.5" />
    </>
  ),
  speech: (
    <>
      <rect x="5.5" y="1.5" width="5" height="8.5" rx="2.5" />
      <path d="M3 8a5 5 0 0 0 10 0M8 13v2" />
    </>
  ),
  cloud: <path d="M4.5 12.5a3 3 0 0 1-.4-6 4 4 0 0 1 7.7-.9 3.4 3.4 0 0 1-.3 6.9z" />,
  mobile: (
    <>
      <rect x="4" y="1.5" width="8" height="13" rx="2" />
      <path d="M7 12.2h2" />
    </>
  ),
  automation: (
    <>
      <circle cx="8" cy="8" r="2.2" />
      <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4" />
    </>
  ),
  data: (
    <>
      <ellipse cx="8" cy="3.5" rx="5" ry="2" />
      <path d="M3 3.5v9c0 1.1 2.2 2 5 2s5-.9 5-2v-9M3 8c0 1.1 2.2 2 5 2s5-.9 5-2" />
    </>
  ),
  comms: <path d="M2 3.5h12v7.5H7l-3 2.5V11H2z" />,
  faith: <path d="M10.5 2.2a6 6 0 1 0 3.3 9.3A5 5 0 0 1 10.5 2.2z" />,
  productivity: (
    <>
      <rect x="2" y="2" width="12" height="12" rx="2" />
      <path d="M5 8.2l2 2 4-4.2" />
    </>
  ),
  utilities: (
    <>
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="9" width="5" height="5" rx="1" />
    </>
  ),
};

export function TechIcon({ k, className = "h-4 w-4" }: { k: TechKey; className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {PATHS[k]}
    </svg>
  );
}
