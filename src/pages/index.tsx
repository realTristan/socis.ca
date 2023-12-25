import MainWrapper from "@/components/MainWrapper";
import PageHead from "@/components/PageHead";
import Navbar, { NavbarTabs } from "@/components/Navbar";
import RapierCanvas from "@/components/threejs/rapier/RapierCanvas";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { BrowserView } from "react-device-detect";
import Background from "@/components/Background";
import SlideIntro from "@/components/SlideIntro";

// Homepage component
export default function Home() {
  return (
    <>
      <PageHead
        title="SOCIS | Home"
        description="The Society of Computing and Information Science (SOCIS) is a student organization at the University of Guelph."
      />

      <Navbar underlined={NavbarTabs.HOME} />
      <Background className="-z-10" text="SOCIS" animated={true} />

      <BrowserView>
        <CustomCursor />
        <RapierCanvas className="z-40 hidden lg:flex" />
        <SlideIntro />
      </BrowserView>

      <MainWrapper className="z-40">
        <p className="fade-in-delay mx-40 bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text text-center text-7xl font-thin text-transparent">
          Inspiring the next generation of tech innovators.
        </p>
      </MainWrapper>
    </>
  );
}
