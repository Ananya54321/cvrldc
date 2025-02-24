import mongoose, { Schema } from "mongoose";
const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  vertical: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  organisedBy: {
    type: String,
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
  },
  isCancelled: {
    type: Boolean,
  },
  winners: [
    {
      first: String,
      second: String,
      third: String,
    },
  ],
});

const Event = mongoose.models?.Event || mongoose.model("Event", eventSchema);

export default Event;
