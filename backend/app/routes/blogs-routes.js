import express from 'express';

import * as blogsController from '../controllers/blogs-controllers.js'; 

const router = express.Router();

router.route("/")
    // .get(blogsController.getBlogs)
    // .post(blogsController.saveBlog)

router.route('/:id')
    .put(blogsController.updateBlog)
    .delete(blogsController.deleteBlog)


export default router;