import MainWrapper from "@/components/MainWrapper";
import PageHead from "@/components/PageHead";
import Navbar from "@/components/Navbar";
import RapierCanvas from "@/components/threejs/rapier/RapierCanvas";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { BrowserView } from "react-device-detect";

// Homepage component
export default function Home() {
  return (
    <>
      <Navbar />
      <BrowserView>
        <RapierCanvas />
      </BrowserView>
      <CustomCursor />

      <PageHead
        title="SOCIS | Home"
        description="The Society of Computing and Information Systems (SOCIS) is a student organization at the University of Guelph."
      />

      <MainWrapper className="stripes-dark-45 items-center justify-center">
        <h1 className="text-outline-emerald text-center text-[10rem] font-black text-transparent md:text-[15rem] lg:text-[20rem] xl:text-[25rem] 2xl:text-[27rem]">
          SOCIS
        </h1>
        <p className="bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text text-center text-lg font-thin text-transparent">
          Inspiring the next generation of tech innovators.
        </p>
        <div className="fixed -bottom-4 h-4 w-screen rotate-180 animate-pulse rounded-full opacity-20 shadow-xl shadow-emerald-500"></div>
      </MainWrapper>
    </>
  );
}
