import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/,
        index: true
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
    password: { //password hash
        type: String,
        required: true
    }
})

const userModel = mongoose.model("User", userSchema);

export default userModel;