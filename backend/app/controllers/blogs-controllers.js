import * as BlogService from '../services/blogs-service.js'
import { setErrorResponse, setResponse } from './response-handler.js';

export const getBlogs = async (request, response) => {

}

export const saveBlog = async(request, response) => {
   
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