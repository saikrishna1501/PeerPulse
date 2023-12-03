import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import theme from '../../theme/theme';

const Footer = () => {
  return (
    <Paper
      sx={{
        textAlign: 'center',
        p: 6,
        backgroundColor: '#f0f0f0', // Set your desired background color
        // flexShrink: 0,
        // marginTop: 'auto', // Push the footer to the bottom of the page
        width: "100%",
        mt: 10,
        background: [theme.palette.info.main],
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © 2023 PeerPulse. All rights reserved.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Contact us at: peerpulse6150@gmail.com | Phone: (617) 602-9142
      </Typography>
    </Paper>
  );
};

export default Footer;