import { cn } from "@/utils/cn";
import { type PropsWithChildren } from "react";

interface ButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function Button(props: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={cn(
        "m-2 border border-white px-7 py-3 duration-300 ease-in-out hover:bg-white hover:text-black",
        props.className,
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
