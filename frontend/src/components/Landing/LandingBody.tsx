import { Container, Stack, Typography } from "@mui/material";
import backgroundImage from "../../../src/assets/events.jpg";
import backgroundImage2 from "../../../src/assets/blogs.jpg";
import backgroundImage3 from "../../../src/assets/housing.jpg";
import EventsButton from "../Button/EventsButton";
import BlogsButton from "../Button/BlogsButton";
import { LandingNote } from "./LandiingNote";
import HousingButton from "../Button/HosuingButton";

export const LandingBody = () => {
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
                Supercharge your team's collaboration and efficiency with
                uniquely tailored events designed to perfectly match your needs.
                Unleash the power of customization for unforgettable and
                impactful experiences.
              </div>
              <br />
              <EventsButton />
            </div>
          </Stack>
        </Stack>
        <LandingNote
          showImage={true}
          text={
            "Tailored for +15,000 Northeastern Huskies, because your journey deserves the extra sparkle! 🌟"
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
                Ignite your knowledge and inspiration as you explore a diverse
                array of blogs meticulously crafted to cater to your interests
                and needs. Discover captivating insights, stay informed, and
                elevate your understanding with our thoughtfully curated blog
                content.
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
          text={
            "🌟  Dive into an exciting Huskies-crafted experience for Huskies!  🌟"
          }
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
                Discover your perfect sanctuary with our tailored housing
                solutions—where comfort meets convenience, and your ideal home
                awaits.
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
