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
        <div className="flex w-full flex-col justify-center p-10 px-10 sm:items-center lg:items-center">
          <h1 className="text-center text-9xl font-black text-white">SOCIS</h1>
          {/* Gradient text from white to gray */}
          <p className="mt-4 w-4/5 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-center text-base font-light text-transparent lg:text-lg">
            Inspiring the next generation of tech innovators.
          </p>
        </div>
      </MainWrapper>
    </>
  );
}
