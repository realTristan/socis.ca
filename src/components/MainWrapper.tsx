import { cn } from "@/utils/cn";
import { type PropsWithChildren } from "react";

export default function MainWrapper(
  props: PropsWithChildren<{ className?: string }>,
): JSX.Element {
  return (
    <main
      className={cn(
        "flex min-h-screen flex-col items-center justify-center text-black",
        props.className,
      )}
    >
      {props.children}
    </main>
  );
}
