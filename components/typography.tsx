import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared type primitives: serif for headings (the newsletter's "voice"),
 * the default sans body font for everything else. Each component only
 * carries the styles common to every use of that tag — callers override
 * size/spacing per context via className (merged with tailwind-merge).
 */

export function H1({ className, ...props }: ComponentPropsWithoutRef<"h1">) {
  return (
    <h1
      className={cn(
        "font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance text-slate-900",
        className,
      )}
      {...props}
    />
  );
}

export function H2({ className, ...props }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className={cn(
        "font-serif text-3xl font-semibold tracking-tight text-balance text-slate-900",
        className,
      )}
      {...props}
    />
  );
}

export function H3({ className, ...props }: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className={cn(
        "font-serif text-2xl font-semibold text-balance text-slate-900",
        className,
      )}
      {...props}
    />
  );
}

export function H4({ className, ...props }: ComponentPropsWithoutRef<"h4">) {
  return (
    <h4
      className={cn(
        "font-serif text-xl font-semibold text-balance text-slate-900",
        className,
      )}
      {...props}
    />
  );
}

export function P({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "text-base leading-7 text-slate-700 [&:not(:first-child)]:mt-4",
        className,
      )}
      {...props}
    />
  );
}

export function Lead({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("text-xl leading-8 text-slate-600 text-pretty", className)}
      {...props}
    />
  );
}

export function Large({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("text-lg font-semibold text-slate-900", className)}
      {...props}
    />
  );
}

export function Small({
  className,
  ...props
}: ComponentPropsWithoutRef<"small">) {
  return (
    <small
      className={cn(
        "text-sm font-medium leading-none text-slate-700",
        className,
      )}
      {...props}
    />
  );
}

export function Muted({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-sm text-slate-500", className)} {...props} />;
}

export function Blockquote({
  className,
  ...props
}: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className={cn(
        "border-l-2 border-slate-300 pl-6 font-serif italic text-slate-700",
        className,
      )}
      {...props}
    />
  );
}

export function List({ className, ...props }: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className={cn(
        "my-4 ml-6 list-disc text-slate-700 [&>li]:mt-2",
        className,
      )}
      {...props}
    />
  );
}
