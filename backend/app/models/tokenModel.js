import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const userTokenSchema = new Schema({
    // userId: { type: Schema.Types.ObjectId, required: true },
    email: {
        type: String,
        required: true,
        unique: true
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3 * 86400 }
});

const UserToken = mongoose.model("UserToken", userTokenSchema)

export default UserToken;