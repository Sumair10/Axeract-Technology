import { SOCIAL } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

const ICONS: Record<(typeof SOCIAL)[number]["key"], React.ReactNode> = {
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V21h-4z" />
  ),
  instagram: (
    <path d="M12 3c2.44 0 2.75 0 3.71.05 2.47.11 3.63 1.28 3.74 3.74.05.96.05 1.27.05 3.71s0 2.75-.05 3.71c-.11 2.46-1.27 3.63-3.74 3.74-.96.05-1.27.05-3.71.05s-2.75 0-3.71-.05c-2.47-.11-3.63-1.28-3.74-3.74C4.5 13.25 4.5 12.94 4.5 10.5s0-2.75.05-3.71C4.66 4.33 5.82 3.16 8.29 3.05 9.25 3 9.56 3 12 3zm0-1.5c-2.48 0-2.8 0-3.77.06C4.93 1.71 3.1 3.53 2.95 6.84 2.9 7.8 2.9 8.12 2.9 10.5s0 2.8.05 3.77c.15 3.3 1.98 5.13 5.28 5.28.97.05 1.29.05 3.77.05s2.8 0 3.77-.05c3.3-.15 5.13-1.97 5.28-5.28.05-.97.05-1.29.05-3.77s0-2.8-.05-3.77c-.15-3.3-1.97-5.13-5.28-5.28C14.8 1.5 14.48 1.5 12 1.5zm0 4.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.8-8.85a1.08 1.08 0 1 0 0 2.16 1.08 1.08 0 0 0 0-2.16z" transform="translate(0 1.5)" />
  ),
  youtube: (
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.28 5 12 5 12 5s-6.28 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.72 19 12 19 12 19s6.28 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z" />
  ),
  github: (
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  ),
  facebook: (
    <path d="M13.5 21v-7.5h2.52l.38-2.93h-2.9V8.7c0-.85.24-1.43 1.45-1.43h1.55V4.65a20.8 20.8 0 0 0-2.26-.12c-2.24 0-3.77 1.37-3.77 3.88v2.16H8v2.93h2.47V21z" />
  ),
};

/** Company social profiles as round icon buttons. */
export function SocialLinks({ className, itemClassName }: { className?: string; itemClassName?: string }) {
  return (
    <ul className={cn("flex items-center gap-2.5", className)} aria-label="Axeract on social media">
      {SOCIAL.map((s) => (
        <li key={s.key}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Axeract on ${s.label} (opens in a new tab)`}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full border border-line text-primary transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white",
              itemClassName,
            )}
          >
            <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor" aria-hidden>
              {ICONS[s.key]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
