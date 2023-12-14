import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import theme from "../../theme/theme";
import { useSelector } from "react-redux";
import getLanguageObject from "../../utils/getLanguageObject";

const Footer = () => {
  const languageSelector = useSelector((state:any)=> state.language.selectedLanguage);
  const choosenLanguage: any = getLanguageObject(languageSelector);

  return (
    <Paper
      sx={{
        textAlign: "center",
        p: 6,
        backgroundColor: "#f0f0f0", // Set your desired background color
        // flexShrink: 0,
        // marginTop: 'auto', // Push the footer to the bottom of the page
        width: "100%",
        background: [theme.palette.info.main],
      }}
    >
      <Typography variant="body2" color="textSecondary">
        {choosenLanguage.footer1}
      </Typography>
      <Typography variant="body2" color="textSecondary">
      {choosenLanguage.footer2}
      </Typography>
    </Paper>
  );
};

export default Footer;
