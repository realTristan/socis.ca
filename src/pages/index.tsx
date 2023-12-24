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
        <RapierCanvas className="z-40" />
      </BrowserView>
      <CustomCursor />

      <PageHead
        title="SOCIS | Home"
        description="The Society of Computing and Information Systems (SOCIS) is a student organization at the University of Guelph."
      />

      <h1 className="text-outline-emerald absolute -top-80 left-1/2 -z-10 -translate-x-1/2 transform text-[40rem] font-black">
        SOCIS
      </h1>
      <h1 className="text-outline-emerald absolute left-1/2 top-8 -z-10 -translate-x-1/2 transform text-[40rem] font-black">
        SOCIS
      </h1>
      <h1 className="text-outline-emerald absolute left-1/2 top-96 -z-10 -translate-x-1/2 transform text-[40rem] font-black">
        SOCIS
      </h1>

      <MainWrapper className="z-40 items-center justify-center">
        <p className="mx-40 bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text text-center text-7xl font-thin text-transparent">
          Inspiring the next generation of tech innovators.
        </p>
      </MainWrapper>
    </>
  );
}
