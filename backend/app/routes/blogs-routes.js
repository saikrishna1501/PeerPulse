import express from 'express';
import * as blogsController from '../controllers/blogs-controller.js'; 

const router = express.Router();

router.route("/")
    .get(blogsController.getBlogs)
    .post(blogsController.saveBlog)


export default router;