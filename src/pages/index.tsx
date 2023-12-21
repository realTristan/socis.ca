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

      <MainWrapper className="stripes-dark-45">
        <div className="flex w-full flex-col items-center justify-center p-10 px-10">
          <h1 className="bg-gradient-to-br from-emerald-200 to-emerald-400 bg-clip-text text-center text-[20rem] font-black text-transparent">
            SOCIS
          </h1>
          <p className="bg-gradient-to-br from-white to-gray-300 bg-clip-text text-center text-base font-light text-transparent lg:text-lg">
            Inspiring the next generation of tech innovators.
          </p>
        </div>
      </MainWrapper>
    </>
  );
}
