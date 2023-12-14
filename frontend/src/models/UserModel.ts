interface User {
    _id : string,
    email : string,
    firstName: string,
    lastName: string,
    profilePic ?: string,
    role: string
}


export const UserRoles = {
    STUDENT: "student",
    ADMIN: "admin"
}

export default User;