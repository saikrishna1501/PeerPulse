import Blog from '../models/blogModel.js';

export const updateBlogByID = async (blogID, updateData) => {
    return await Blog.findByIdAndUpdate(blogID, updateData, { new: true });
  };
  
  export const deleteBlogByID = async (blogID) => {
    return await Blog.findByIdAndDelete(blogID);
  };