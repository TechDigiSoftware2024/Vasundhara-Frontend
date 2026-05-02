import React from "react";
import HeroSection from "../HeroSection";
import OurPresence from "../OurPresence";
// import AnimatedImage from "../AboutHome";
import WhyChooseUs from "../WhyChooseUs";
import WhoWeWorkWith from "../WhoWeWorkWith";

import { Projects } from "../Project";
import { AboutMain } from "./AboutMain";


export default function Home() {
  return (
    <>
      <HeroSection />
    
      {/* <AnimatedImage /> */}
      {/* <AboutHome /> */}
     <AboutMain/>
      <Projects/>

      <WhyChooseUs />
      <WhoWeWorkWith />
    </>
  );
}
