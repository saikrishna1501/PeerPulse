import user from "../../services/UserService"

const userSettingsPage = () => {
    //later need to add useEffect to fetch user data
    const [userDetailsFormData, setUserDetailsFormData] = React.useState({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    })

    const onChangeHandler = (event) => {
        setUserDetailsFormData({
            ...userDetailsFormData,
            [event.target.name]: [event.target.value],
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        //make api call to update the data
        if (firstName && email) {
            console.log(userDetailsFormData);
            alert("Updated details Successfully");
        }
        else {
            console.log("Something went wrong");
        }
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={onSubmitHandler}
        >
            <div>
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
                />
            </div>
        </Box>
    )
}