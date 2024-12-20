import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Feedback } from "@/models/Feedback";

// GET: Fetch a single feedback by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const {id} = params;

  try {
    await connectToDatabase();
    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return NextResponse.json(
        { message: "Feedback not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(feedback, { status: 200 });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      { message: "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}

// PUT: Update a feedback by ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    // Validate required fields
    if (!name || !phone || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Name, phone, email, subject, and message are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { name, phone, email, subject, message },
      { new: true, runValidators: true }
    );

    if (!updatedFeedback) {
      return NextResponse.json(
        { message: "Feedback not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedFeedback, { status: 200 });
  } catch (error) {
    console.error("Error updating feedback:", error);
    return NextResponse.json(
      { message: "Failed to update feedback" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a feedback by ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connectToDatabase();

    const deletedFeedback = await Feedback.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return NextResponse.json(
        { message: "Feedback not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Feedback deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return NextResponse.json(
      { message: "Failed to delete feedback" },
      { status: 500 }
    );
  }
}
