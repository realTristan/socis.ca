import { Checkbox } from "@nextui-org/react";
import { type ChangeEvent, type PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

interface PermissionCheckboxProps {
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultSelected?: boolean;
}
export default function PermissionCheckbox(
  props: PropsWithChildren<PermissionCheckboxProps>,
): JSX.Element {
  return (
    <Checkbox
      size="lg"
      className={cn(
        "font-extralight text-white",
        props.disabled ? "opacity-50" : "",
      )}
      onChange={props.onChange}
      isDisabled={props.disabled}
      defaultSelected={props.defaultSelected}
    >
      {props.children}
    </Checkbox>
  );
}
