import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;
