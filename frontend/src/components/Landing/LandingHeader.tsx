import { Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import SignupButton from "../Button/SignupButton";

export const LandingHeader = () => {
  const [modal, setModal] = React.useState(false);
  const [resetStyles, setResetStyles] = useState(false);

  return (
    <>
      <div className="main" style={{ color: "black" }}>
        <Container>
          <div className="landing-container">
            <div className="landing-content">
              <h3>
                A platform built for a <br />
                new way of studying
              </h3>
              <h6>
                What would you like to explore with{" "}
                <strong> peerpulse.com?</strong>
              </h6>
              <SignupButton />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
