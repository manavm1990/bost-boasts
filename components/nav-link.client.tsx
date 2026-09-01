"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export default function NavLink({
  href,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Link>) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href.toString());

  return (
    <Link
      href={href}
      className={cn(
        "pb-1 text-[13px] font-bold tracking-wide uppercase",
        isActive
          ? "border-b-2 border-brand text-heading"
          : "text-muted transition-colors hover:text-heading",
        className,
      )}
      {...props}
    />
  );
}
