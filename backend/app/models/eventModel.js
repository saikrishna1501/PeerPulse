import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

const Event = mongoose.model('Event', eventSchema);

export default Event;