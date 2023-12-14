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
    // Use Mongoose's populate method to replace comment IDs with actual comments
    const blogs = await Blog.find().populate({
      path: 'comments',
      model: 'Comment', 
      select: 'comment' 
    }).exec();

    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

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

export const getBlogByIdAndPopulateComments = async (blogId) => {
  try {
      // Find the blog by ID and populate the comments field
      const blog = await Blog.findById(blogId).populate({
          path: 'comments',
          model: 'Comment',
      }).exec();

      // Ensure blog is not null before proceeding
      if (!blog) {
          return null;  // Or handle it according to your needs
      }

      // Ensure the comments array exists and has elements
      if (!blog.comments || blog.comments.length === 0) {
          return blog;
      }

      // Filter comments for the specific blog
      const filteredComments = blog.comments.filter(comment => comment && comment.blog && comment.blog.equals(blogId));

      // Replace the comments array in the blog with the filtered comments
      blog.comments = filteredComments;

      return blog;
  } catch (error) {
      console.error("Error fetching blog:", error);
      throw error;ç
  }
};

export const getBlogsByTag = async (tag) => {
  try {
      // Fetch blogs with the specified tag
      const blogs = await Blog.find({ tag: tag }).exec();
      return blogs;
  } catch (error) {
      console.error('Error fetching blogs by tag:', error);
      throw error;
  }
};

export const handleUpvote = async (blogId, userId) => {
  try {
    const blog = await getBlogByIdAndPopulateComments(blogId);

    if (!blog) {
      throw new Error('Blog not found');
    }

    const hasUpvoted = blog.upvotes.users.some((upvoteUserId) => upvoteUserId.equals(userId));

    if (!hasUpvoted) {
      blog.upvotes.users.push(userId);
      blog.upvotes.count += 1;
      await blog.save();
      return blog.upvotes.count;
    } else {
      throw new Error('User has already upvoted this blog');
    }
  } catch (error) {
    throw error;
  }
};


export const patchBlogById = async (blogId, updateData) => {
  try {
    // Use Mongoose's findById to fetch the existing blog entry
    const existingBlog = await Blog.findById(blogId);

    // Ensure the blog entry exists
    if (!existingBlog) {
      throw new Error('Blog not found');
    }

    // Update the fields present in the request body
    for (const key in updateData) {
      existingBlog[key] = updateData[key];
    }

    // Save the updated blog entry
    const updatedBlog = await existingBlog.save();

    return updatedBlog;
  } catch (error) {
    throw error;
  }
};


// Function to retrieve blogs using start and end indices
export const getBlogsByStartAndEndIndices = async ({ startIndex = 0, endIndex = 10 }) => {
  try {
    // Use Mongoose's find method with skip and limit to implement pagination
    const blogs = await Blog.find().skip(startIndex).limit(endIndex - startIndex).exec();

    return blogs;
  } catch (error) {
    console.error("Error fetching blogs by indices:", error);
    throw error;
  }
};

export const countBlogs = async() => {
  return Blog.countDocuments();
}

