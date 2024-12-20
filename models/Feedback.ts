import mongoose, { Schema, Document } from "mongoose";

// Feedback Interface
export interface IFeedback extends Document {
  name: string; // Name of the person providing feedback
  phone: string; // Phone number of the person
  email: string; // Email address of the person
  subject: string; // Subject of the feedback
  message: string; // The feedback content/message
  createdAt: Date; // Timestamp for when the feedback was created
  updatedAt: Date; // Timestamp for when the feedback was last updated
}

// Feedback Schema
const FeedbackSchema: Schema = new Schema({
  name: { type: String, required: true }, // Name of the person
  phone: { type: String, required: true }, // Phone number
  email: { type: String, required: true }, // Email address
  subject: { type: String, required: true }, // Subject of the feedback
  message: { type: String, required: true }, // Feedback message
  createdAt: { type: Date, default: Date.now }, // Auto-set timestamp for record creation
  updatedAt: { type: Date, default: Date.now }, // Auto-set timestamp for record update
});

// Pre-save hook to update the `updatedAt` field before saving
FeedbackSchema.pre("save", function (next) {
  const feedback = this as unknown as IFeedback;
  feedback.updatedAt = new Date();
  next();
});

export const Feedback =
  mongoose.models.Feedback || mongoose.model<IFeedback>("Feedback", FeedbackSchema);
