import { Container, Stack, Typography } from "@mui/material";
import backgroundImage from "../../../src/assets/events.jpg";
import backgroundImage2 from "../../../src/assets/blogs.jpg";
import backgroundImage3 from "../../../src/assets/housing.jpg";
import EventsButton from "../Button/EventsButton";
import BlogsButton from "../Button/BlogsButton";
import { LandingNote } from "./LandiingNote";
import HousingButton from "../Button/HosuingButton";
import { useSelector } from "react-redux";
import getLanguageObject from "../../utils/getLanguageObject";





export const LandingBody = () => {
const languageSelector = useSelector((state:any)=> state.language.selectedLanguage);
const choosenLanguage: any = getLanguageObject(languageSelector);
  return (
    <>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          sx={{ fontSize: "25px" }}
          spacing={20}
          paddingTop={15}
        >
          <div className="landing-body-item">
            <div className="landing-body-item animated-item">
              <img
                src={backgroundImage}
                alt="Events Background"
                className="animated-image"
              />
            </div>
          </div>
          <Stack direction="column" spacing={10}>
            <div className="animated-item">
              <div>
                {choosenLanguage.Intro1}
              </div>
              <br />
              <EventsButton />
            </div>
          </Stack>
        </Stack>
        <LandingNote
          showImage={true}
          text={
            choosenLanguage.Intro2
          }
        />
        <Stack
          direction="row"
          sx={{ fontSize: "25px" }}
          spacing={20}
          paddingTop={15}
        >
          <Stack direction="column" spacing={10}>
            <div className="animated-item">
              <div>
              {choosenLanguage.Intro3}
              </div>
              <br />
              <BlogsButton />
            </div>
          </Stack>
          <div className="landing-body-item">
            <div className="landing-body-item animated-item">
              <img
                src={backgroundImage2}
                alt="Events Background"
                className="animated-image"
              />
            </div>
          </div>
        </Stack>
        <LandingNote
          showImage={false}
          text={choosenLanguage.Intro4}
        />
        <Stack
          direction="row"
          sx={{ fontSize: "25px" }}
          spacing={20}
          paddingTop={15}
        >
          <div className="landing-body-item">
            <div className="landing-body-item animated-item">
              <img
                src={backgroundImage3}
                alt="Events Background"
                className="animated-image"
              />
            </div>
          </div>
          <Stack direction="column" spacing={10}>
            <div className="animated-item">
              <div>
              {choosenLanguage.Intro5}
              </div>
              <br />
              <HousingButton />
            </div>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default LandingBody;
