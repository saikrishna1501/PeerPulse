import * as BlogService from '../services/blogs-service.js'
import { setErrorResponse, setResponse } from './response-handler.js';

  
export const createBlog = async (request, response, next) => {
    try {
      const blogData = request.body; 
      const createdBlog = await BlogService.createBlog(blogData);
      response.status(201).json(createdBlog);
    } catch (error) {
      // Handle the error, log it, and send an error response
      console.error("Error creating blog:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
}

//get all the blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await BlogService.getAllBlogs();
    res.status(200).json(blogs);
  } catch (error) {
    // Handle the error, log it, and send an error response
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// get blog by id
export const findBlogById = async (req, res) => {
  try{
    // get id from url
    const blogId = req.params.id;
    // fetch blog from blogService
    const blog = await BlogService.getBlogById(blogId);
    res.status(200).json(blog);
  }catch (error){
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//Function to update Blog by passing id
export const updateBlog = async(request, response) => {
    try {
        const updatedBlog = await BlogService.updateBlogByID(request.params.id, request.body);
        setResponse(updatedBlog, response);
      } catch (error) {
        setErrorResponse(error, response);
      }
}

//Function to delete Blog by passing id
export const deleteBlog = async (request, response) => {
    try {
      await BlogService.deleteBlogByID(request.params.id);
      setResponse({}, response);
      } catch (error) {
        setErrorResponse(error, response);
      }
  }