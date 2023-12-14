import express from 'express';
// Create a new router instance from Express to handle routes
const router = express.Router();
import eventController from '../controllers/index.js'
import authorize from '../middlewares/auth-middleware.js';
import checkRoles from '../middlewares/check-roles-middleware.js';
import { Roles } from '../models/users-model.js';

// Define the route for the root path ('/')
router.route('/')
    .get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]),eventController.getEvents)
    .post(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]),eventController.createEvent)

router.route('/filter')
    .post(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]),eventController.getEvents);

// Define the route for paths with an 'id' parameter (e.g., '/123')
router.route('/:id')
    .get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]), eventController.getEventById)
    .put(authorize, checkRoles([Roles.ADMIN]), eventController.updateEvent)
    .delete(authorize, checkRoles([Roles.ADMIN]), eventController.deleteEvent);

// Define the route for register
router.route('/register')
    .post(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]), eventController.registerEvent);

// Define the route for unregister
router.route('/unregister')
    .post(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]), eventController.unregisterEvent);

export default router;