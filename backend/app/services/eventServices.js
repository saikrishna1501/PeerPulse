import Event from "../models/eventModel.js";

// Function to get all events, possibly filtered by certain criteria
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
  // Apply a filter by payment type (paid or free) if specified
  if (filters.isPaid !== undefined) {
    query.isPaid = filters.isPaid === 'true';
  }
  console.log(Event)
  return await Event.find(query).exec();
};

// Function to get a specific event by its ID
export const getEventById = async (eventId) => {
  return await Event.findById(eventId);
};

// Function to create a new event with the given data
export const createEvent = async (eventData) => {
  const event = new Event(eventData);
  return await event.save();
};

// Function to update an existing event with new data
export const updateEvent = async (eventId, updateData) => {
  return await Event.findByIdAndUpdate(eventId, updateData, { new: true });
};

// Function to delete an event by its ID
export const deleteEvent = async (eventId) => {
  return await Event.findByIdAndDelete(eventId);
};