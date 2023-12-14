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
    const blog = await BlogService.getBlogByIdAndPopulateComments(blogId);
    res.status(200).json(blog);
  }catch (error){
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
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

  export const handleUpvote = async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.body.userId; // Assuming you have user information in req.user

        // Find the blog by ID
        const blog = await BlogService.getBlogByIdAndPopulateComments(blogId);

        // Ensure the blog exists
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Check if the user has already upvoted
        const hasUpvoted = blog.upvotes.users.some(upvote => upvote.equals(userId));

        if (!hasUpvoted) {
            // Add the user's upvote
            blog.upvotes.users.push(userId);
            blog.upvotes.count += 1;
        } else {
            // If the user has already upvoted, decrement the count and remove the user
            blog.upvotes.users = blog.upvotes.users.filter(upvote => !upvote.equals(userId));
            blog.upvotes.count -= 1;
        }

        // Save the updated blog
        await blog.save();

        // Return the updated blog
        res.status(200).json({ count: blog.upvotes.count, users: blog.upvotes.users, blogId: blog.id });
    } catch (error) {
        console.error('Error handling upvote:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





// Controller function to get upvotes for a blog
export const getUpvotes = async (req, res) => {
    try {
        // Get blog id from URL parameters
        const blogId = req.params.id;

        // Find the blog in the database
        const blog = await BlogService.getBlogByIdAndPopulateComments(blogId);

        // Check if the blog exists
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Respond with the current upvotes count
        res.status(200).json({ upvotes: blog.upvotes });
    } catch (error) {
        console.error('Error fetching upvotes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const handleDownvote = async (req, res) => {
  try {
      const blogId = req.params.id;

      // Find the blog by ID
      const blog = await BlogService.getBlogByIdAndPopulateComments(blogId);

      // Ensure the blog exists
      if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
      }

      // Check if the request body contains the expected action
      const { action } = req.body;

      if (action === 'downvote') {
          // Increment the upvotes count
          blog.downvotes += 1;

          // Save the updated blog
          await blog.save();

          // Return the updated blog
          res.status(200).json({ downvote: blog.downvotes });
      } else {
          // If the action is not recognized, respond with an error
          res.status(400).json({ error: 'Invalid action' });
      }
  } catch (error) {
      console.error('Error handling upvote:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get upvotes for a blog
export const getDownVote = async (req, res) => {
  try {
      // Get blog id from URL parameters
      const blogId = req.params.id;

      // Find the blog in the database
      const blog = await BlogService.getBlogByIdAndPopulateComments(blogId);

      // Check if the blog exists
      if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
      }

      // Respond with the current upvotes count
      res.status(200).json({ downvotes: blog.downvotes });
  } catch (error) {
      console.error('Error fetching downvotes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBlogsByTag = async (req, res) => {
  try {
      const tag = req.query.tag;
      // Call the service method to get blogs by tag
      const blogs = await BlogService.getBlogsByTag(tag);

      res.status(200).json(blogs);
  } catch (error) {
      console.error('Error fetching blogs by tag:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const patchBlog = async (req, res) => {
  try {
    // Fetch the fields provided in req.body
    const blog = req.body;

    // Validate that the request body contains fields to update
    if (!blog || Object.keys(blog).length === 0) {
      return res.status(400).json({ error: 'No fields provided for update' });
    }

    // Validate that the fields to update are allowed
    const allowedFields = ['title', 'content', 'tag'];
    const fieldsToUpdate = Object.keys(blog);

    for (const fieldToUpdate of fieldsToUpdate) {
      if (!allowedFields.includes(fieldToUpdate)) {
        return res.status(400).json({ error: `Invalid field to update: ${fieldToUpdate}` });
      }
    }

    // Create an object with the fields to update and their new values
    const updateObject = {};

    fieldsToUpdate.forEach((field) => {
      updateObject[field] = blog[field];
    });

    // Get the blog ID from the request parameters
    const blogId = req.params.id;

    // Update the blog using the BlogService
    const updatedBlog = await BlogService.patchBlogById(blogId, updateObject);

    // Send the updated blog as a response
    setResponse(updatedBlog, res);
  } catch (error) {
    // Handle the error and send an error response
    setErrorResponse(error, res);
  }
};



//Function to update Blog by passing id
export const updateBlog = async(request, response) => {
  try {
      const updatedBlog = await BlogService.updateBlogByID(request.params.id, request.body);
      setResponse(updatedBlog, response);
    } catch (error) {
      setErrorResponse(error, response);
    }
}