import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { To, useNavigate } from 'react-router-dom';

type props = {
    title: String,
    description: String,
    pageRoute: String,
    buttonText: String
}

const PaddedPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    border: `1px solid ${theme.palette.grey[300]}`,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: theme.spacing(4),
    marginButtom: theme.spacing(4),
  }
));

const PageGuideSection = ({title, description, pageRoute, buttonText}: props) => {
    const navigate = useNavigate();

    const NavigatePageButtonClickHandler = (pageRoute: String): void => {
        navigate(pageRoute as To);
    }
    
    return (
        <PaddedPaper variant="outlined" square={false}>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="body1" gutterBottom sx={{textAlign: "justify"}}>
                    {description}
                </Typography>
                </Grid>
                <Grid item xs={10}>
                </Grid>
                <Grid item xs={2} sx={{textAlign: 'center'}}>
                    <Button color="primary" variant="contained" onClick={() => NavigatePageButtonClickHandler(pageRoute)}>{buttonText}</Button>
                </Grid>
            </Grid>
        </Box>
        </PaddedPaper>
    )
}

export default PageGuideSection;