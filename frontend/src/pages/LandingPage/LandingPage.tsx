import React from "react";
import PageGuideSection from "./PageGuideSection/PageGuideSection";
import { Container } from "@mui/material";
import IntroductionSection from "./PageGuideSection/IntroductionSection";
import { LandingHeader } from "../../components/Landing/LandingHeader";
import LandingBody from "../../components/Landing/LandingBody";

const LandingPage: React.FC = () => {
  return (
    <>
      <LandingHeader />
      <LandingBody />
    </>
  );
};

export default LandingPage;