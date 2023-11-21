//Import Express for creating the router and blogsController for handling blog-related requests.
import express from 'express';

import * as blogsController from '../controllers/blogs-controllers.js'; 

const router = express.Router();

router.route("/")
    // .get(blogsController.getBlogs)
    // .post(blogsController.saveBlog)

router.route('/:id')
    //Route for handling PUT and DELETE requests related to a specific blog entry by ID.
    .put(blogsController.updateBlog)
    .delete(blogsController.deleteBlog)


export default router;