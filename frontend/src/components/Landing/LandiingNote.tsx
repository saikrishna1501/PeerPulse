import { Button, Container, Typography } from "@mui/material";
import backgroundImage2 from "../../../src/assets/husky.jpg";

interface Props {
  text: string;
  showImage: boolean;
}
export const LandingNote = ({ text, showImage }: Props) => {
  return (
    <>
      <div className="landing-note" style={{ color: "black" }}>
        <Container>
          <div className="landing-content animated-item">
            {showImage && (
              <img
                src={backgroundImage2}
                alt="Events Background"
                className="animated-image"
              />
            )}
            <h6>
              <em>{text}</em>
            </h6>
          </div>
        </Container>
      </div>
    </>
  );
};
