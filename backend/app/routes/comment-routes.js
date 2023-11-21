//Import Express for creating the router and commentController for handling comment-related requests.
import express from 'express';

import * as commentsController from '../controllers/comment-controller.js'; 

import authorize from '../middlewares/auth-middleware.js';
import checkRoles from '../middlewares/check-roles-middleware.js';
import { Roles } from '../models/users-model.js';

//create express router
const router = express.Router();

//post a comment 
router.route('/')
    .post(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT, Roles.MODERATOR]), commentsController.addComment);

//export comments router
export default router;