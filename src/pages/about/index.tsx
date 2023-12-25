import MainWrapper from "@/components/MainWrapper";
import PageHead from "@/components/PageHead";
import Navbar, { NavbarTabs } from "@/components/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { BrowserView } from "react-device-detect";
import Background from "@/components/Background";
import SlideIntro from "@/components/SlideIntro";

// Homepage component
export default function AboutPage() {
  return (
    <>
      <PageHead
        title="SOCIS | About Us"
        description="The Society of Computing and Information Systems (SOCIS) is a student organization at the University of Guelph."
      />

      <Navbar underlined={NavbarTabs.ABOUT} />
      <Background text="ABOUT" className="-z-10" />

      <BrowserView>
        <CustomCursor />
        <SlideIntro />
      </BrowserView>

      <MainWrapper className="z-40"></MainWrapper>
    </>
  );
}
