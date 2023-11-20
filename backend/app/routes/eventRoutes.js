import express from 'express';
const router = express.Router();
import eventController from '../controllers/index.js'

router.route('/')
    .get(eventController.getEvents)
    .post(eventController.createEvent)

    router.route('/:id')
    .get(eventController.getEvent)
    .put(eventController.updateEvent)
    .delete(eventController.deleteEvent);
export default router;