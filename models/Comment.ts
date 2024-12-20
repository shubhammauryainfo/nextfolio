import mongoose, { Schema, Document } from "mongoose";

// Comment Interface
export interface IComment extends Document {
  name: string; // Name of the commenter
  blogTitle: string; // Title of the associated blog
  phone: string; // Phone number of the commenter
  email: string; // Email address of the commenter
  message: string; // The comment content/message
  createdAt: Date; // Timestamp for when the comment was created
  updatedAt: Date; // Timestamp for when the comment was last updated
}

// Comment Schema
const CommentSchema: Schema = new Schema({
  name: { type: String, required: true }, // Name of the commenter
  blogTitle: { type: String, required: true }, // Associated blog's title
  phone: { type: String, required: true }, // Phone number
  email: { type: String, required: true }, // Email address
  message: { type: String, required: true }, // Comment message
  createdAt: { type: Date, default: Date.now }, // Auto-set timestamp for record creation
  updatedAt: { type: Date, default: Date.now }, // Auto-set timestamp for record update
});

// Pre-save hook to update the `updatedAt` field before saving
CommentSchema.pre("save", function (next) {
  const comment = this as unknown as  IComment;
  comment.updatedAt = new Date();
  next();
});

export const Comment =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);
