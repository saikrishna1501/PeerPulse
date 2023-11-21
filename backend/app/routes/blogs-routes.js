//Import Express for creating the router and blogsController for handling blog-related requests.
import express from 'express';

import * as blogsController from '../controllers/blogs-controllers.js'; 

import authorize from '../middlewares/auth-middleware.js';
import checkRoles from '../middlewares/check-roles-middleware.js';
import { Roles } from '../models/users-model.js';

const router = express.Router();

router.route("/")
    // .get(blogsController.getBlogs)
    // .post(blogsController.saveBlog)

router.route('/:id')
    //Route for handling PUT and DELETE requests related to a specific blog entry by ID.
    .put(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT, Roles.MODERATOR]), blogsController.updateBlog)
    .delete(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT, Roles.MODERATOR]), blogsController.deleteBlog)

export default router;