import * as CommentService from '../services/comment-services.js';
import * as BlogService from '../services/blogs-service.js';
import { setErrorResponse, setResponse } from './response-handler.js';

export const addComment = async (request, response) => {
    try {
        // Get blog id from url
        const blogId = request.params.id;

        // Get blog object asynchronously using await
        const blog = await BlogService.getBlogById(blogId);

        // Ensure blog is not null before proceeding
        if (!blog) {
            return response.status(404).json({ error: "Blog not found" });
        }

        // Get comment from request body
        const comment = request.body;
        const commentId = await CommentService.addComment(comment);
        const addedComment = await CommentService.getCommentById(commentId);

        // Ensure comments array is created
        if (!blog.comments) {
            blog.comments = [];
        }

        // Associate the comment with the blog and update the blog object
        blog.comments.push(addedComment);
        await BlogService.updateBlogByID(blogId, blog);

        response.status(201).json(addedComment);
    } catch (error) {
        // Handle the error, log it, and send an error response
        console.error("Error creating blog:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
};

export const getComments = async (request, response) => {
    try {
        // Get blog id from URL
        const blogId = request.params.id;

        // Get blog object asynchronously using await
        const blog = await BlogService.getBlogByIdAndPopulateComments(blogId);

        // Ensure blog is not null before proceeding
        if (!blog) {
            return response.status(404).json({ error: "Blog not found" });
        }

        // Send the filtered comments as a response
        response.status(200).json(blog.comments);

    } catch (error) {
        // Handle the error, log it, and send an error response
        console.error("Error fetching comments:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
};


export const deleteCommentById = async (request, response) => {
    try {
        // Get blog id from url
        const blogId = request.params.id;

        // Get blog object asynchronously using await
        const blog = await BlogService.getBlogById(blogId);

        // Ensure blog is not null before proceeding
        if (!blog) {
            return response.status(404).json({ error: "Blog not found" });
        }

        // Get commentId
        const commentId = request.params.commentId; // Corrected from req.params.commentId

        if (!blog.comments || blog.comments.length === 0) {
            return response.status(404).json({ error: "Comment not found" });
        }

        // Find the index of the comment with the specified commentId
        const commentIndex = blog.comments.findIndex(comment => comment == commentId);

        // Check if the commentId was found
        if (commentIndex !== -1) {
            // Use filter to create a new array excluding the comment with the specified commentId
            blog.comments = blog.comments.filter((_, index) => index !== commentIndex);

            // Update blogs
            await BlogService.updateBlogByID(blogId, blog);
            await CommentService.deleteCommentById(commentId);

            response.status(200).json({message: "Successfully deleted comment"});
        } else {
            // If commentId was not found, return a 404 response
            return response.status(404).json({ error: "Comment not found" });
        }
    } catch (error) {
        // Handle the error, log it, and send an error response
        console.error("Error deleting comment:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateCommentById = async (request, response) => {
    try {
        // Get blog id from URL
        const blogId = request.params.id;

        // Get blog object asynchronously using await
        const blog = await BlogService.getBlogById(blogId);

        // Ensure blog is not null before proceeding
        if (!blog) {
            return response.status(404).json({ error: "Blog not found" });
        }

        // Get commentId
        const commentId = request.params.commentId;

        // Get updated comment content from request body
        const updatedCommentContent = request.body.comment;

        if (!blog.comments || blog.comments.length === 0) {
            return response.status(404).json({ error: "Comment not found" });
        }

        // Find the index of the comment with the specified commentId
        const commentIndex = blog.comments.findIndex(comment => comment == commentId);

        // Check if the commentId was found
        if (commentIndex !== -1) {
            // Update the comment content in the comments array
            blog.comments[commentIndex].comment = updatedCommentContent;

            // Update blogs
            await BlogService.updateBlogByID(blogId, blog);
            // Update comment content using CommentService
            await CommentService.updateCommentById(commentId, { comment: updatedCommentContent });

            response.status(200).json(blog.comments[commentIndex]);
        } else {
            // If commentId was not found, return a 404 response
            return response.status(404).json({ error: "Comment not found" });
        }
    } catch (error) {
        // Handle the error, log it, and send an error response
        console.error("Error updating comment:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
};

export const findCommentById = async (req, res) => {
    try{
      // get id from url
      const commentId = req.params.commentId;
      // fetch blog from blogService
      const blog = await CommentService.getCommentById(commentId);
      res.status(200).json(blog);
    }catch (error){
      console.error("Error fetching blogs:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
