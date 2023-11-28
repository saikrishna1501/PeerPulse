//import mongoose to access mongodb
import mongoose from "mongoose";

const Schema = mongoose.Schema;

//ENUM data for Roles
export const Roles = {
    ADMIN: "admin",
    MODERATOR: "moderator",
    STUDENT: "student"
}

//Mongoose Schema for user
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/,
        index: {
            unique: true
        }
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    phoneNumber: {
        type: String,
        match: /^\+\d{1,4}(\d{10})?$/
    },
    profilePic: {
        type: String,
        default: "https://icons8.com/icon/tZuAOUGm9AuS/user-default"
    },
    // savedEvents: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Event',
    // }],
    savedEvents: {
        type: [String]
    },
    role: {
        type: String,
        enum: [Roles.ADMIN, Roles.MODERATOR, Roles.STUDENT],
        default: "student"
    },
    password: { //password hash
        type: String,
        required: true
    },
    activationToken:{
        type: String,
        required: true
    },
    isValid:{
        type: Boolean,
        default: false
    }
})

//create a model using the schema
const userModel = mongoose.model("User", userSchema);

//export the schema
export default userModel;
