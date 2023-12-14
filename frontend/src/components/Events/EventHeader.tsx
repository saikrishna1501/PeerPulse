import { Container } from "@mui/material";
import React, { useState } from "react";
import backgroundImage from "../../../src/assets/events-header.jpeg";
import { motion } from "framer-motion";

export const EventHeader = () => {
  const [modal, setModal] = React.useState(false);
  const [resetStyles, setResetStyles] = useState(false);

  return (
    <>
      <div
        className="main"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <Container>
          <div className="main-container">
            <motion.div
              animate={{ x: 100 }}
              transition={{
                type: "tween",
                padding: resetStyles ? 0 : 20,
              }}
              className="event-content"
            >
              <h3>Explore the vibrant Events,</h3>
              <h6>where memorable moments await!"</h6>
            </motion.div>
          </div>
        </Container>
      </div>
    </>
  );
};
