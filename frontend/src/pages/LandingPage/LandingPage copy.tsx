import React from "react";
import PageGuideSection from "./PageGuideSection/PageGuideSection";
import { Container } from "@mui/material";
import IntroductionSection from "./PageGuideSection/IntroductionSection";

const LandingPage: React.FC = () => {
  return (
    <>
      <Container maxWidth="lg">
        <IntroductionSection
          title="WELCOME PEERS..!!"
          description="Id proident nisi excepteur ut ex reprehenderit. Do Lorem ullamco id do officia. Exercitation irure ut eiusmod veniam duis aliqua deserunt pariatur consectetur minim qui esse labore sunt. Nostrud occaecat aliqua deserunt id laboris aute veniam eu laboris ut consectetur in exercitation. Ipsum excepteur aliqua aliqua elit ullamco eiusmod nulla irure ad.Esse amet sint veniam aliqua adipisicing reprehenderit laborum est. Pariatur pariatur consequat duis nostrud fugiat proident. Magna aute ut et amet et ex amet ut velit aliquip laborum. Reprehenderit culpa aute in ut elit id esse minim eiusmod eiusmod dolor.Laborum minim occaecat dolor id officia deserunt non consectetur est. Magna duis nostrud ad consequat incididunt est ullamco ut consectetur minim consequat. Officia laborum dolor eiusmod ipsum aute veniam elit est non enim. Est tempor exercitation commodo fugiat velit. Cillum velit sint sunt sunt officia non laboris ut cillum aliqua."
        ></IntroductionSection>
        <PageGuideSection
          title="Events"
          description="Pariatur consequat eu exercitation aute anim consectetur in excepteur. Cupidatat duis elit quis ad id Lorem cillum ex nisi qui. Ut deserunt in aute quis sint cillum minim ullamco elit. Non anim enim occaecat officia minim magna sunt enim aliquip esse anim ut. Amet minim labore deserunt officia labore. Ut duis reprehenderit voluptate pariatur aliquip nisi occaecat et.Quis in ea nostrud dolore. Pariatur nostrud non excepteur aliqua qui. Eu consequat eu labore eu officia non exercitation ipsum.Ullamco cillum velit mollit elit adipisicing in. Cillum enim dolor voluptate esse sint. Magna adipisicing adipisicing ex anim veniam amet ea officia duis non ullamco id culpa. Ullamco sit minim ex tempor anim excepteur pariatur. Commodo est ullamco consectetur sint non. Consequat non ullamco tempor est elit."
          pageRoute="/events"
          buttonText="Explore Events"
        />
        <PageGuideSection
          title="Housing"
          description="Pariatur consequat eu exercitation aute anim consectetur in excepteur. Cupidatat duis elit quis ad id Lorem cillum ex nisi qui. Ut deserunt in aute quis sint cillum minim ullamco elit. Non anim enim occaecat officia minim magna sunt enim aliquip esse anim ut. Amet minim labore deserunt officia labore. Ut duis reprehenderit voluptate pariatur aliquip nisi occaecat et.Quis in ea nostrud dolore. Pariatur nostrud non excepteur aliqua qui. Eu consequat eu labore eu officia non exercitation ipsum.Ullamco cillum velit mollit elit adipisicing in. Cillum enim dolor voluptate esse sint. Magna adipisicing adipisicing ex anim veniam amet ea officia duis non ullamco id culpa. Ullamco sit minim ex tempor anim excepteur pariatur. Commodo est ullamco consectetur sint non. Consequat non ullamco tempor est elit."
          pageRoute="/housing"
          buttonText="Find Housing"
        />
        <PageGuideSection
          title="Blogs"
          description="Pariatur consequat eu exercitation aute anim consectetur in excepteur. Cupidatat duis elit quis ad id Lorem cillum ex nisi qui. Ut deserunt in aute quis sint cillum minim ullamco elit. Non anim enim occaecat officia minim magna sunt enim aliquip esse anim ut. Amet minim labore deserunt officia labore. Ut duis reprehenderit voluptate pariatur aliquip nisi occaecat et.Quis in ea nostrud dolore. Pariatur nostrud non excepteur aliqua qui. Eu consequat eu labore eu officia non exercitation ipsum.Ullamco cillum velit mollit elit adipisicing in. Cillum enim dolor voluptate esse sint. Magna adipisicing adipisicing ex anim veniam amet ea officia duis non ullamco id culpa. Ullamco sit minim ex tempor anim excepteur pariatur. Commodo est ullamco consectetur sint non. Consequat non ullamco tempor est elit."
          pageRoute="/blogs"
          buttonText="Explore Blogs"
        />
      </Container>
      {/* Main content */}
    </>
  );
};

export default LandingPage;
