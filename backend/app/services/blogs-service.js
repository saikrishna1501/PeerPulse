//Import the Blog model for MongoDB interactions.
import Blog from '../models/blogModel.js';


export const updateBlogByID = async (blogID, updateData) => {
    // Use Mongoose's findByIdAndUpdate to update the blog entry by its ID
    return await Blog.findByIdAndUpdate(blogID, updateData, { new: true });
  };
  
  export const deleteBlogByID = async (blogID) => {
    // Use Mongoose's findByIdAndDelete to delete the blog entry by its ID
    return await Blog.findByIdAndDelete(blogID);
  };