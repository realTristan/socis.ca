import { cn } from "@/utils/cn";

export default function SlideIntro({
  className,
}: {
  className?: string;
}): JSX.Element {
  return (
    <div
      className={cn(
        "animate-slide-intro bg-primary absolute h-screen w-screen",
        className,
      )}
    ></div>
  );
}
