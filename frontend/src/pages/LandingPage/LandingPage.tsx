import React from 'react';
import PageGuideSection from './PageGuideSection/PageGuideSection';
import { Container} from '@mui/material';
import IntroductionSection from './PageGuideSection/IntroductionSection';
import { useSelector } from 'react-redux';
import english from '../../languages/english';
import spanish from '../../languages/spanish';
import Language from '../../models/language';


const LandingPage: React.FC = () => {
  const languageSelector = useSelector((state: any) => state.language.selectedLanguage);
  const chosenLanguage = languageSelector === Language.ENGLISH ? english:spanish;
  return (
    <>
        <Container maxWidth="lg">
          <IntroductionSection title="WELCOME PEERS..!!" description="Welcome to Peer Pulse, your heartbeat for all things Northeastern University and beyond!"></IntroductionSection>
          <PageGuideSection title="Events" description="Ready to dive into the rhythm of student life? Let's start with Events—your backstage pass to the coolest happenings in and around Northeastern. Whether it's campus festivities, local gigs, or city-wide celebrations, we've got the lowdown. Tap into the pulse of your university experience!" pageRoute="/events" buttonText="Explore Events" />
          <PageGuideSection title="Housing" description="Now, let's talk Off-Campus Housing. Because a comfy nest is crucial, right? Peer Pulse connects you with the hottest listings, tips for snagging the perfect pad, and a community of students who've been there, done that. Your home away from home is just a click away!" pageRoute="/housing" buttonText="Explore Housing" />
          <PageGuideSection title="Blogs" description="But hey, life's not just about where you live—it's about what you think and feel. That's where our Blogging platform comes in. Share your musings, experiences, and wild thoughts with the student community. It's your space to shine and let your voice be heard. After all, your pulse is unique, and we want to hear it loud and clear!" pageRoute="/blogs" buttonText="Explore Blogs" />
          {/* <h1>{selectedLanguage.test}</h1> */}
        </Container>
        {/* Main content */}
    </>
  );
};

export default LandingPage;