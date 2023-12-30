import { cn } from "@/utils/cn";
import { Dispatch, SetStateAction } from "react";

/**
 * Menu bars component
 * @param props Menu bars props
 * @returns JSX.Element
 */
export default function MobileMenuBars(props: {
  className?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const { open, className, setOpen } = props;

  function Bar(props: { className?: string }): JSX.Element {
    return (
      <span
        className={cn("h-0.5 rounded-full bg-white", props.className)}
      ></span>
    );
  }

  return (
    <div
      onClick={() => setOpen(!open)}
      className={cn(
        "group fixed right-8 top-8 flex cursor-pointer flex-col items-end justify-end space-y-2.5 p-3",
        className,
      )}
    >
      <Bar
        className={
          open
            ? "w-10 translate-y-3.5 rotate-45 transform duration-300 ease-in-out group-hover:-rotate-45"
            : "w-10"
        }
      />
      <Bar className={open ? "opacity-0" : "w-10"} />
      <Bar
        className={
          open
            ? "w-10 -translate-y-[10px] -rotate-45 transform duration-300 ease-in-out group-hover:rotate-45"
            : "w-10"
        }
      />
    </div>
  );
}
