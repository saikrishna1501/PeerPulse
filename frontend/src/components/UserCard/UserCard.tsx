import { Button, Grid, Paper, styled } from "@mui/material";

type props = {
    email: string,
    firstName: string,
    lastName: string,
    role: string
}

const CardPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    border: `1px solid ${theme.palette.grey[300]}`,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: 0,
    marginButtom: theme.spacing(4),
    // marginLeft: "auto",
    // marginRight: "auto",
    maxWidth: "60%",
    marginLeft: 0,
}
));

const UserCard = ({email,firstName,lastName,role}: props) => {
    return (
        <CardPaper variant="outlined" square={false}>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                      <h6>{firstName.substring(0,10) + " " + lastName.substring(0,10)}</h6>      
                </Grid>
                <Grid item xs={3}>
                    <Button color="error" variant="contained">Save</Button>    
                </Grid>

                    
            </Grid>
        </CardPaper>
    )
}

export default UserCard;