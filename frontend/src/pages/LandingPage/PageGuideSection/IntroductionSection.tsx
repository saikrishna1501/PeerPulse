import { Box, Grid, Paper, Typography } from "@mui/material"

type props = {
    title: String,
    description: String
}

const IntroductionSection = ({title, description}: props) => {
    
    return(
        <Box component="section" sx={{mt: 2, mb: 6, flexGrow: 1}}>
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
            </Grid>
        </Box>
    )
}

export default IntroductionSection;