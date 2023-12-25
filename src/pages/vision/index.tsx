import MainWrapper from "@/components/MainWrapper";
import PageHead from "@/components/PageHead";
import Navbar, { NavbarTabs } from "@/components/Navbar";
import RapierCanvas from "@/components/threejs/rapier/RapierCanvas";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { BrowserView } from "react-device-detect";
import Background from "@/components/Background";
import SlideIntro from "@/components/SlideIntro";

// Homepage component
export default function VisionPage() {
  return (
    <>
      <PageHead
        title="SOCIS | Vision"
        description="The Society of Computing and Information Systems (SOCIS) is a student organization at the University of Guelph."
      />

      <Navbar underlined={NavbarTabs.OUR_VISION} />
      <Background text="VISION" className="-z-10" />

      <BrowserView>
        <CustomCursor />
        <SlideIntro />
      </BrowserView>

      <MainWrapper className="z-40"></MainWrapper>
    </>
  );
}
