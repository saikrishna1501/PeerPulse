// Import the mongoose module to interact with MongoDB
import mongoose from "mongoose";

// Retrieve the Schema constructor from the mongoose object
const Schema = mongoose.Schema;

export const eventTypes = {
   IN_PERSON: 'in-person',
   VIRTUAL: 'virtual'
}

// Define a new schema for 'event' documents
const eventSchema = new Schema({
  title: { type: String, required: true },
  organizer: String,
  description: String,
  date: { type: Date, required: true },
  location: String,
  categories: [String],
  isPaid: Boolean,
  imageUrl: String,
  type: { type: String, enum: [eventTypes.IN_PERSON, eventTypes.VIRTUAL], default: eventTypes.IN_PERSON },
  proofDocument: {type: String, default: ""}, // URL or reference to the document
  creatorId: String,
  latitude: Number,
  longitude: Number
});

// Create a model from the schema. This model is used to create and manage 'Event' documents.
const Event = mongoose.model('Event', eventSchema);

// Export the Event model for use in other parts of the application
export default Event;