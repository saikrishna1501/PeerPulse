import express from 'express';
// Create a new router instance from Express to handle routes
const router = express.Router();
import eventController from '../controllers/index.js'
import authorize from '../middlewares/auth-middleware.js';
import checkRoles from '../middlewares/check-roles-middleware.js';
import { Roles } from '../models/users-model.js';

// Define the route for the root path ('/')
router.route('/')
    .get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT, Roles.MODERATOR]),eventController.getEvents)
    .post(authorize, checkRoles([Roles.ADMIN, Roles.MODERATOR]),eventController.createEvent)

// Define the route for paths with an 'id' parameter (e.g., '/123')
router.route('/:id')
    .get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT, Roles.MODERATOR]), eventController.getEventById)
    .put(authorize, checkRoles([Roles.ADMIN, Roles.MODERATOR]), eventController.updateEvent)
    .delete(authorize, checkRoles([Roles.ADMIN, Roles.MODERATOR]), eventController.deleteEvent);

export default router;