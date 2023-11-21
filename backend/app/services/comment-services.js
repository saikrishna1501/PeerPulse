//Import the Blog model for MongoDB interactions.
import Comment from '../models/commentModel.js';

//creating a blog
export const addComment = async (comment) => {
  try {
    const newComment = new Comment(comment);
    const addedComment = await newComment.save();
    return addedComment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

export const getCommentById = async (commentId) => {
  return await Comment.findById(commentId);
}

export const deleteCommentById = async (commentId) => {
  return await Comment.findByIdAndDelete(commentId);
}

export const updateCommentById = async (commentId, updatedComment) => {
  return await Comment.findByIdAndUpdate(commentId, updatedComment, { new: true });
}
