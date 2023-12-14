import { Container } from "@mui/material";
import React, { useState } from "react";
import backgroundImage from "../../../src/assets/ezgif.com-gif-maker.png";
import { motion } from "framer-motion";

export const BlogHeader = () => {
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
                Discover on Blogger, <br />
                where words come to life!
              </h3>
              <h6>
                It's easy and free to post your thinking on any topic and
                connect with millions of readers.
              </h6>
            </motion.div>
          </div>
        </Container>
      </div>
    </>
  );
};
