import Blog from '../models/blogModel.js';

export const updateBlog = async (blogID, updateData) => {
    return await Blog.findByIdAndUpdate(blogID, updateData, { new: true });
  };
  
  export const deleteBlog = async (blogID) => {
    return await Blog.findByIdAndDelete(blogID);
  };