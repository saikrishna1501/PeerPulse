import { Container } from "@mui/material";
import React from "react";

export const BlogHeader = () => {
  const [modal, setModal] = React.useState(false);

  return (
    <>
      <div className="main">
        <Container>
          <div className="main-container">
            <div className="main-content">
              <h3>
                Discover on Blogger, <br />
                where words come to life!
              </h3>
              <h6>
                It's easy and free to post your thinking on any topic and
                connect with millions of readers.
              </h6>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
