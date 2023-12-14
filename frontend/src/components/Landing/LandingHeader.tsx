import { Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import SignupButton from "../Button/SignupButton";
import { useSelector } from "react-redux";
import getLanguageObject from "../../utils/getLanguageObject";

export const LandingHeader = () => {
  const [modal, setModal] = React.useState(false);
  const [resetStyles, setResetStyles] = useState(false);
  const languageSelector = useSelector(
    (state: any) => state.language.selectedLanguage
  );
  const choosenLanguage: any = getLanguageObject(languageSelector);

  return (
    <>
      <div className="main" style={{ color: "black" }}>
        <Container>
          <div className="landing-container">
            <div className="landing-content">
              <h3>
                {choosenLanguage.LandingPage1}
                <br />
                {choosenLanguage.LandingPage2}
              </h3>
              <h6>
                {choosenLanguage.LandingPage3}{" "}
                <strong> {choosenLanguage.LandingPage4}</strong>
              </h6>
              <SignupButton />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
