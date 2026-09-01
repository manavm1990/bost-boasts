"use client";

import { Switch } from "@base-ui-components/react/switch";
import { useHydrated, useTheme } from "@wrksz/themes/client";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useHydrated(); // Wait for client hydration
  const checked = hydrated && resolvedTheme === "dark";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-bold tracking-wide text-muted uppercase",
        className,
      )}
    >
      <SunIcon className="size-3.5" />
      <Switch.Root
        aria-label="Toggle dark mode"
        checked={checked}
        onCheckedChange={(next) => setTheme(next ? "dark" : "light")}
        className="inline-flex h-5 w-9 shrink-0 items-center rounded-full bg-border p-0.5 transition-colors data-checked:bg-brand"
      >
        <Switch.Thumb className="size-4 rounded-full bg-paper transition-transform data-checked:translate-x-4" />
      </Switch.Root>
      <MoonIcon className="size-3.5" />
    </div>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}
