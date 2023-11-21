import EventService from '../services/index.js'
// Import response handling functions from the response-handler module
import { setResponse, setErrorResponse } from './response-handler.js';

// Controller function to retrieve a list of events
export const getEvents = async (req, res) => {
  try {
    const events = await EventService.getAllEvents(req.query);
    setResponse(events, res);
  } catch (error) {
    setErrorResponse(error, res);
  }
};

// Controller function to retrieve a specific event by its ID
export const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await EventService.getEventById(eventId);
    if (!event) {
      return res.status(404).send('Event not found');
    }
    setResponse(event, res);
  } catch (error) {
    setErrorResponse(error, res);
  }
  };

// Controller function to add a new event
export const createEvent = async (req, res) => {
  try {
    const event = await EventService.createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    setErrorResponse(error, res);
  }
};

// Controller function to update an existing event
export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await EventService.updateEvent(req.params.id, req.body);
    setResponse(updatedEvent, res);
  } catch (error) {
    setErrorResponse(error, res);
  }
};

// Controller function to delete an event
export const deleteEvent = async (req, res) => {
  try {
    await EventService.deleteEvent(req.params.id);
    setResponse({},res);
  } catch (error) {
    setErrorResponse(error, res);
  }
}