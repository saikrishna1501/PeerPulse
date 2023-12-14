//Import Express for creating the router and blogsController for handling blog-related requests.
import express from 'express';

import * as blogsController from '../controllers/blogs-controllers.js'; 

import authorize from '../middlewares/auth-middleware.js';
import checkRoles from '../middlewares/check-roles-middleware.js';
import upvoteLimiter from '../middlewares/upvote-limiter.js'
import { Roles } from '../models/users-model.js';

import * as commentsController from '../controllers/comment-controller.js'; 

//create express router
const router = express.Router();

//Post and get routes requires authentication for blogs
router.route("/")
.post(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]),blogsController.createBlog)
.get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]),blogsController.getBlogs)

//post a comment 
router.route('/:id/comments/:commentId')
    .delete(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]), commentsController.deleteCommentById)
    .patch(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]), commentsController.updateCommentById)
    .get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]), commentsController.findCommentById)


//post a comment 
router.route('/:id/comments')
    .post(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]), commentsController.addComment)
    .get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]), commentsController.getComments);


router.route('/search')
    .get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]), blogsController.getBlogsByTag);

//both put and delete blogs routes require authentication
router.route('/:id')
    //Route for handling PUT and DELETE requests related to a specific blog entry by ID.
    .get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]), blogsController.findBlogById)
    .put(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]), blogsController.updateBlog)
    .patch(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]), blogsController.patchBlog)
    .delete(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]), blogsController.deleteBlog)


router.route('/:id/upvote')
    .post(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT, Roles.MODERATOR]), upvoteLimiter, blogsController.handleUpvote)
    .get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT, Roles.MODERATOR]), blogsController.getUpvotes)

    router.route('/:id/downvote')
    .post(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]), blogsController.handleDownvote)
    .get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]), blogsController.getDownVote)

//export blogs router
export default router;