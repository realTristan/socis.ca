import { cn } from "@/utils/cn";
import { useState } from "react";
import MobileMenuBars from "./MenuBars";
import { NavbarProps } from "./Navbar";
import MobileMenuDropDown from "./MobileMenuDropdown";
import Image from "next/image";

/**
 * Mobile navbar component
 * @param props Navbar props
 * @returns JSX.Element
 */
export default function MobileNavbar(props: NavbarProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={cn("flex flex-col", props.className)}>
      <Image
        src="/images/logo.png"
        alt="..."
        width={70}
        height={70}
        className="btn absolute left-6 top-6 duration-300 ease-in-out"
        priority={true}
      />

      <MobileMenuBars open={open} setOpen={setOpen} className="z-[70]" />
      {open && (
        <MobileMenuDropDown
          className="z-[60]"
          showAuthButton={true}
          underlined={null}
        />
      )}
    </div>
  );
}
