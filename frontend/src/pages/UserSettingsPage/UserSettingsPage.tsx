import { Box, Button, Grid, Paper, TextField, styled } from "@mui/material"
import React from "react"
import ProfilePictureUpload from "./ProfilePictureUploadComponent.tsx/ProfilePictureUpload"
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/users";
import { updateAuthDetails } from "../../store/auth";
import { toast } from "react-toastify";

const formSxStyles = {
    '& .MuiTextField-root': { m: 1, width: '40ch' },
    p: 0
}

const FormContainerPaper = styled(Paper)(({ theme }) => ({
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

const UserSettingsPage = () => {
    const dispatch = useDispatch();

    const userDetails = useSelector(
        (state: any) => state.auth.user
    );

    //later need to add useEffect to fetch user data
    const [userDetailsFormData, setUserDetailsFormData] = React.useState({
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        profilePic: userDetails.profilePic
    })

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetailsFormData({
            ...userDetailsFormData,
            [event.target.name]: event.target.value,
        })
    }

    const setProfilePic = (imgUrl: string) => {
        setUserDetailsFormData({
            ...userDetailsFormData,
            profilePic: imgUrl,
        })
    }

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //make api call to update the data
        if (userDetailsFormData.firstName && userDetailsFormData.email) {
            // console.log(userDetailsFormData);
            dispatch(updateUser({firstName: userDetailsFormData.firstName, lastName: userDetailsFormData.lastName, profilePic: userDetailsFormData.profilePic},userDetails._id));
            dispatch(updateAuthDetails({
                firstName: userDetailsFormData.firstName,
                lastName: userDetailsFormData.lastName,
                profilePic: userDetailsFormData.profilePic,
              } as any));
            alert("Updated details Successfully");
            toast.success('Updated details Successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });

        }
        else {
            console.error("Not all the required fields were entered");
        }
    }

    // console.log(defaultProfilePictureLink)

    return (
        <FormContainerPaper variant="outlined" square={false}>
                    <Box
                        component="form"
                        sx={formSxStyles}
                        noValidate
                        autoComplete="off"
                        onSubmit={onSubmitHandler}
                    >
                        <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <ProfilePictureUpload src={userDetailsFormData.profilePic} formUpdateHandler={setProfilePic} name="profilePic" />
                        </Grid>
                        <Grid item xs={9} sx={{display: "flex", flexDirection: "column"}}>
                        <TextField
                            name="firstName"
                            id="outlined-required"
                            onChange={onChangeHandler}
                            value={userDetailsFormData.firstName}
                            label="First Name"
                        />
                        <TextField
                            name="lastName"
                            id="outlined-helperText"
                            onChange={onChangeHandler}
                            value={userDetailsFormData.lastName}
                            label="Last Name"
                        />
                        <TextField
                            name="email"
                            id="outlined-required"
                            type="email"
                            onChange={onChangeHandler}
                            value={userDetailsFormData.email}
                            label="Email ID"
                            disabled
                        />
                        </Grid>
                        <Grid item xs={12} sx={{textAlign: "center"}}>
                            <Button type="submit" color="primary" variant="contained" sx={{mr: 2,ml:2}}>Save</Button>
                            {/* <Button type="reset" color="primary" variant="contained" sx={{mr: 2,ml:2}}>Reset</Button> */}
                        </Grid>
                        </Grid>
                    </Box>
        </FormContainerPaper>
    )
}

export default UserSettingsPage;