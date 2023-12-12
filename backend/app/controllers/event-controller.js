import { EventUnRegisterationConfirmationEmailTemplateOptions, InPersonEventConfirmationEmailTemplateOptions, VirtualEventConfirmationEmailTemplateOptions, emailTypes, sendEmail } from '../middlewares/sendMail.js';
import { eventTypes } from '../models/eventModel.js';
import EventService from '../services/index.js'
import { registerForEvent, unRegisterForEvent } from '../services/users-service.js';
// Import response handling functions from the response-handler module
import { setResponse, setErrorResponse } from './response-handler.js';

// Controller function to retrieve a list of events
export const getEvents = async (req, res) => {
  try {
    let query = {...req.query}
    if(req.body) {
      query = {...query, ...req.body}
    }
    console.log("query", query);
    const events = await EventService.getAllEvents(query);
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

// Controller function to register for an event
export const registerEvent = async (req,res) => {
  try {
    const {eventId, userId} = req.body;
    const updatedUserDetails = await registerForEvent(userId, eventId);
    setResponse(updatedUserDetails, res);
    const eventDetails = await EventService.getEventById(eventId);
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', timeZone: "America/New_York" };
    const formattedDate = eventDetails.date.toLocaleDateString('en-US', dateOptions);

    // Parse and format the time
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true,  timeZone: "America/New_York" };
    const formattedTime = eventDetails.date.toLocaleTimeString('en-US', timeOptions);
    if(eventDetails.type === eventTypes.IN_PERSON) {
      sendEmail(new InPersonEventConfirmationEmailTemplateOptions(updatedUserDetails.email, updatedUserDetails.firstName, eventDetails.title, formattedDate, formattedTime, eventDetails.location), emailTypes.EVENT_REGISTRATION_INPERSON_CONFIRMATION);
    }
    else {
      sendEmail(new VirtualEventConfirmationEmailTemplateOptions(updatedUserDetails.email, updatedUserDetails.firstName, eventDetails.title, formattedDate, formattedTime), emailTypes.EVENT_REGISTRATION_VIRTUAL_CONFIRMATION);
    }
  } catch (error) {
    setErrorResponse(error, res);
  }
}

export const unregisterEvent = async (req,res) => {
  try {
    const {eventId, userId} = req.body;
    const updatedUserDetails = await unRegisterForEvent(userId, eventId);
    setResponse(updatedUserDetails, res);
    const eventDetails = await EventService.getEventById(eventId);
    sendEmail(new EventUnRegisterationConfirmationEmailTemplateOptions(updatedUserDetails.email, updatedUserDetails.firstName, eventDetails.title), emailTypes.EVENT_UNREGISTRATION_CONFIRMATION);
  } catch (error) {
    setErrorResponse(error, res);
  }
}

// Controller function to delete an event
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await EventService.deleteEvent(req.params.id);
    setResponse(deletedEvent,res);
  } catch (error) {
    setErrorResponse(error, res);
  }
}