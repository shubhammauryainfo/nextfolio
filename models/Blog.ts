import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image_Url?: string;
  metaTitle?: string;
  metaDescription?: string;
  slug: string;
  keywords: string[];
  canonicalUrl?: string;
  publishedAt?: Date;
  updatedAt: Date;
  // readingTime?: number;
  // viewCount: number;
  // likeCount: number;
  // commentCount: number;
  // shareCount: number;
  
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], default: [] },
  image_Url: { type: String },
  metaTitle: { type: String },
  metaDescription: { type: String },
  slug: { type: String, unique: true, required: true },
  keywords: { type: [String], default: [] },
  canonicalUrl: { type: String },
  publishedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // status: {
  //   type: String,
  //   enum: ["published", "draft", "archived"],
  //   default: "draft",
  // },
  // readingTime: { type: Number },
  // viewCount: { type: Number, default: 0 },
  // likeCount: { type: Number, default: 0 },
  // commentCount: { type: Number, default: 0 },
  // shareCount: { type: Number, default: 0 },
  // featured: { type: Boolean, default: false },
  // priority: { type: Number, default: 0 },
  // relatedPosts: { type: [Schema.Types.ObjectId], ref: "Blog", default: [] },
  // language: { type: String, default: "en" },
});

export const Blog =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
