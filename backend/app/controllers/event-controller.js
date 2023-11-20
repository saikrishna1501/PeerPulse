import EventService from '../services/index.js'
import { setResponse, setErrorResponse } from './response-handler.js';

export const getEvents = async (req, res) => {
  try {
    const events = await EventService.getAllEvents(req.query);
    setResponse(events, res);
  } catch (error) {
    setErrorResponse(error, res);
  }
};

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



export const createEvent = async (req, res) => {
  try {
    const event = await EventService.createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    setErrorResponse(error, res);
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await EventService.updateEvent(req.params.id, req.body);
    setResponse(updateEvent, res);
  } catch (error) {
    setErrorResponse(error, res);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await EventService.deleteEvent(req.params.id);
    res.status(200).send('Event deleted successfully');
  } catch (error) {
    setErrorResponse(error, res);
  }
}