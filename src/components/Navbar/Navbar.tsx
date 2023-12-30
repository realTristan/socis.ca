import { cn } from "@/utils/cn";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import MobileNavbar from "./MobileNavbar";
import DefaultNavbar from "./DefaultNavbar";

export enum NavbarTabs {
  HOME,
  EVENTS,
  ABOUT,
  MEMBERSHIP,
}

export interface NavbarProps {
  className?: string;
  showAuthButton?: boolean;
  underlined: NavbarTabs | null;
}

export default function Navbar(props: PropsWithChildren<NavbarProps>) {
  return (
    <SessionProvider>
      <DefaultNavbar
        className={cn("hidden flex-auto lg:flex", props.className)}
        showAuthButton={props.showAuthButton}
        underlined={props.underlined}
      />
      <MobileNavbar
        className={cn("lg:hidden", props.className)}
        showAuthButton={props.showAuthButton}
        underlined={props.underlined}
      />
    </SessionProvider>
  );
}
