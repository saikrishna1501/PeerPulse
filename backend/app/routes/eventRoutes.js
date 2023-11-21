import express from 'express';
// Create a new router instance from Express to handle routes
const router = express.Router();
import eventController from '../controllers/index.js'

// Define the route for the root path ('/')
router.route('/')
    .get(eventController.getEvents)
    .post(eventController.createEvent)

// Define the route for paths with an 'id' parameter (e.g., '/123')
router.route('/:id')
    .get(eventController.getEventById)
    .put(eventController.updateEvent)
    .delete(eventController.deleteEvent);

export default router;