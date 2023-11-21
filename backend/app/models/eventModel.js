// Import the mongoose module to interact with MongoDB
import mongoose from "mongoose";

// Retrieve the Schema constructor from the mongoose object
const Schema = mongoose.Schema;

// Define a new schema for 'event' documents
const eventSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  categories: [String],
  isPaid: Boolean,
  type: { type: String, enum: ['in-person', 'virtual'], default: 'in-person' },
  proofDocument: String, // URL or reference to the document
});

// Create a model from the schema. This model is used to create and manage 'Event' documents.
const Event = mongoose.model('Event', eventSchema);

// Export the Event model for use in other parts of the application
export default Event;