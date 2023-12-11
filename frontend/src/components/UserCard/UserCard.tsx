import { Box, Button, Grid, Paper, Typography, styled } from "@mui/material";
import theme from "../../theme/theme";
import { deleteUser } from "../../store/users";
import { useDispatch } from "react-redux";

type props = {
    userId: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string,
    onUserDelete: (userId: string) => void
}

const CardPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    border: `1px solid ${theme.palette.grey[300]}`,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: 0,
    marginBottom: theme.spacing(4),
    // marginLeft: "auto",
    // marginRight: "auto",
    maxWidth: "60%",
    marginLeft: 0,
}
));


const UserCard = ({userId,email,firstName,lastName,role, onUserDelete}: props) => {

    const handleClick = (userId: string): void => {
        onUserDelete(userId)
    } 
    return (
        <CardPaper variant="outlined" square={false}>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                <Typography variant="h5">
                    {email}
                </Typography>   
                </Grid>
                <Grid item xs={3}>
                    <Button color="error" variant="contained" onClick={() => handleClick(userId)}>Delete</Button>    
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <b>User ID</b>: {userId}
                    </Typography> 
                    <Typography variant="body1">
                        <b>Name:</b> {firstName.substring(0,10) + " " + (lastName ? ` ${lastName.substring(0, 10)}` : '')}
                    </Typography> 
                    <Typography variant="body1">
                        <b>Role:</b> {role}
                    </Typography>   
                </Grid>

                    
            </Grid>
        </CardPaper>
    )
}

export default UserCard;