import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Comment } from "@/models/Comment";

// GET: Fetch a single comment by ID
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params; // Awaiting params

  try {
    await connectToDatabase();
    const comment = await Comment.findById(id);

    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.error("Error fetching comment:", error);
    return NextResponse.json(
      { message: "Failed to fetch comment" },
      { status: 500 }
    );
  }
}

// PUT: Update a comment by ID
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params; // Awaiting params

  try {
    const body = await request.json();
    const { name, blogTitle, phone, email, message } = body;

    // Validate required fields
    if (!name || !blogTitle || !phone || !email || !message) {
      return NextResponse.json(
        { message: "Name, blog title, phone, email, and message are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { name, blogTitle, phone, email, message },
      { new: true, runValidators: true }
    );

    if (!updatedComment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { message: "Failed to update comment" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a comment by ID
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params; // Awaiting params

  try {
    await connectToDatabase();

    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { message: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
