interface User {
    _id : string,
    email : string,
    firstName: string,
    lastName: string,
    profilePic ?: string,
    role: string
}

export default User;