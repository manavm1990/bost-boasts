import type { PropsWithChildren } from "react";
import { H1 } from "@/components/typography";

export default function Title({ children }: PropsWithChildren) {
  return (
    <H1 className="text-2xl md:text-4xl lg:text-6xl text-pretty max-w-3xl">
      {children}
    </H1>
  );
}
