//Import Express for creating the router and blogsController for handling blog-related requests.
import express from 'express';

import * as blogsController from '../controllers/blogs-controllers.js'; 

import authorize from '../middlewares/auth-middleware.js';
import checkRoles from '../middlewares/check-roles-middleware.js';
import { Roles } from '../models/users-model.js';

import * as commentsController from '../controllers/comment-controller.js'; 

//create express router
const router = express.Router();

//Post and get routes requires authentication for blogs
router.route("/")
.post(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT, Roles.MODERATOR]),blogsController.createBlog)
.get(blogsController.getBlogs)

//post a comment 
router.route('/:id/comments/:commentId')
    .delete(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT, Roles.MODERATOR]), commentsController.deleteCommentById)
    .put(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT, Roles.MODERATOR]), commentsController.updateCommentById)


//post a comment 
router.route('/:id/comments')
    .post(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT, Roles.MODERATOR]), commentsController.addComment)
    .get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT, Roles.MODERATOR]), commentsController.getComments);

//both put and delete blogs routes require authentication
router.route('/:id')
    //Route for handling PUT and DELETE requests related to a specific blog entry by ID.
    .get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT, Roles.MODERATOR]), blogsController.findBlogById)
    .put(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT, Roles.MODERATOR]), blogsController.updateBlog)
    .delete(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT, Roles.MODERATOR]), blogsController.deleteBlog)

//export blogs router
export default router;