import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    upvotes: {
        count: {
            type: Number,
            default: 0,
        },
        users: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
    downvotes: {
        type: Number,
        default: 0
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    reported: {
        type: Boolean,
        default: false
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: null
    },
    tag: {
        type: [String]
    }
});

const blogModel = mongoose.model("Blog", blogSchema);

export default blogModel;
