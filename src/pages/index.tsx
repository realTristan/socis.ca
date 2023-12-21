import { api } from "@/utils/api";
import { PREVENT_TRPC_FETCH } from "@/utils/trpc";
import { useState } from "react";
import { Status, type Response } from "@/lib/types";
import { LoadingRelative } from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import MainWrapper from "@/components/MainWrapper";
import Button from "@/components/Button";
import PageHead from "@/components/PageHead";
import Navbar from "@/components/Navbar";
import RapierBalls from "@/components/rapier/RapierBalls";
import CustomCursor from "@/components/dynamic/CustomerCursor";

// Homepage component
export default function Home() {
  return (
    <>
      <Navbar />
      <RapierBalls />
      <CustomCursor />

      <PageHead
        title="SOCIS"
        description="The Society of Computing and Information Systems (SOCIS) is a student organization at the University of Guelph."
      />

      <MainWrapper className="stripes-dark-45">
        <div className="flex w-full flex-col justify-center p-10 px-10 sm:items-center lg:items-center">
          <h1 className="text-center text-9xl font-black text-white">SOCIS</h1>
          {/* Gradient text from white to gray */}
          <p className="fade-in mt-4 w-4/5 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-center text-base font-light text-transparent lg:text-lg">
            Inspiring the next generation of tech innovators.
          </p>
        </div>
      </MainWrapper>
    </>
  );
}
