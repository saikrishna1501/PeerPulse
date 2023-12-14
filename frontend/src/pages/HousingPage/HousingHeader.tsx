import { Container } from "@mui/material";
import React, { useState } from "react";
import backgroundImage from "../../../src/assets/housingHeader.jpeg";
import { motion } from "framer-motion";

export const HousingHeader = () => {
  const [modal, setModal] = React.useState(false);
  const [resetStyles, setResetStyles] = useState(false);

  return (
    <>
      <div
        className="main"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Container>
          <div className="main-container">
            <motion.div
              animate={{ x: 100 }}
              transition={{
                type: "tween",
                padding: resetStyles ? 0 : 20,
              }}
              className="main-content"
            >
              <h3>
                Dorms to Dreams: Elevate Living <br />
              </h3>
              <h6>Home is where every comfort is. Come, lets explore..!!!</h6>
            </motion.div>
          </div>
        </Container>
      </div>
    </>
  );
};
