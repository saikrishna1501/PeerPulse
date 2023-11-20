import Event from "../models/index.js";

export const getAllEvents = async (filters) => {
  let query = {};
  // filters events happening on or after this date
  if (filters.date) {
    query.date = { $gte: new Date(filters.date) };
  }
  //by location
  if (filters.location) {
    query.location = filters.location;
  }
  //by event type
  if (filters.isPaid !== undefined) {
    query.isPaid = filters.isPaid === 'true';
  }
  return await Event.find(query);
};

export const createEvent = async (eventData) => {
  const event = new Event(eventData);
  return await event.save();
};

export const updateEvent = async (eventId, updateData) => {
  return await Event.findByIdAndUpdate(eventId, updateData, { new: true });
};

export const deleteEvent = async (eventId) => {
  return await Event.findByIdAndDelete(eventId);
};