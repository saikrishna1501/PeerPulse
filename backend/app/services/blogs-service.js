//Import the Blog model for MongoDB interactions.
import Blog from '../models/blogModel.js';

//creating a blog
export const createBlog = async (blogData) => {
  try {
    const newBlog = new Blog(blogData);
    const createdBlog = await newBlog.save();
    return createdBlog;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
}

//get all the blogs
export const getAllBlogs = async () => {
  try {
    const blogs = await Blog.find().exec();
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}

export const updateBlogByID = async (blogID, updateData) => {
    // Use Mongoose's findByIdAndUpdate to update the blog entry by its ID
  return await Blog.findByIdAndUpdate(blogID, updateData, { new: true });
};
  
export const deleteBlogByID = async (blogID) => {
    // Use Mongoose's findByIdAndDelete to delete the blog entry by its ID
    return await Blog.findByIdAndDelete(blogID);
};

export const getBlogById = async (blogId) => {
  return await Blog.findById(blogId);
}