import EventService from '../services/index.js'

export const getEvents = async (req, res) => {
  try {
    const events = await EventService.getAllEvents(req.query);
    res.json(events);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getEvent = async (req, res) => {
    try {
      const event = await EventService.getAllEvents(req.params.id);
      res.json(event);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };



export const createEvent = async (req, res) => {
  try {
    const event = await EventService.createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await EventService.updateEvent(req.params.id, req.body);
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await EventService.deleteEvent(req.params.id);
    res.status(200).send('Event deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
}