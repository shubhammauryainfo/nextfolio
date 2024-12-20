/* eslint-disable */

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { NextResponse } from "next/server";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Extend the `params` type to include custom properties
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Cast `params` to allow custom properties
    allowed_formats: ["jpg", "jpeg", "png"],
    use_filename: true,
    unique_filename: true,
    resource_type: "auto",
    transformation: [
      { width: 1200, height: 1200, crop: "limit" },
      { quality: "auto:low" },
      { fetch_format: "auto" },
      { flags: "lossy" },
      { quality: 60 },
    ],
  } as any, // Add `as any` to bypass type checking for `params`
});

// Initialize multer with the Cloudinary storage
const upload = multer({ storage });

// POST Endpoint for File Upload
export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  // Handle file upload logic
  return NextResponse.json({ message: "File uploaded successfully." });
}
