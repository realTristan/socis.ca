import { cn } from "@/utils/cn";

interface BackgroundProps {
  text: string;
  animated?: boolean; // animate-text-outline-emerald
  className?: string;
}

export default function Background(props: BackgroundProps) {
  return (
    <div className={cn("relative", props.className)}>
      <h1
        className={cn(
          "fixed -top-80 left-1/2 -translate-x-1/2 transform text-[40rem] font-black",
          props.animated ? "animate-text-outline-emerald" : "text-outline-dark",
        )}
      >
        {props.text}
      </h1>
      <h1
        className={cn(
          "fixed left-1/2 top-8 -translate-x-1/2 transform text-[40rem] font-black",
          props.animated ? "animate-text-outline-emerald" : "text-outline-dark",
        )}
      >
        {props.text}
      </h1>
      <h1
        className={cn(
          "fixed left-1/2 top-96 -translate-x-1/2 transform text-[40rem] font-black",
          props.animated ? "animate-text-outline-emerald" : "text-outline-dark",
        )}
      >
        {props.text}
      </h1>
    </div>
  );
}
