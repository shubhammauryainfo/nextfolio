import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Comment } from "@/models/Comment";

// GET: Fetch all comments
export async function GET() {
  try {
    await connectToDatabase();
    const comments = await Comment.find({});
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { message: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// POST: Create a new comment
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, blogTitle, phone, email, message } = body;

    // Validate required fields
    if (!name || !blogTitle || !phone || !email || !message) {
      return NextResponse.json(
        { message: "Name, blog title, phone, email, and message are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newComment = new Comment({
      name,
      blogTitle,
      phone,
      email,
      message,
    });

    const savedComment = await newComment.save();
    return NextResponse.json(savedComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { message: "Failed to create comment" },
      { status: 500 }
    );
  }
}
