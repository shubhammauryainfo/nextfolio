import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Feedback } from "@/models/Feedback";

// Unified handler for GET, PUT, DELETE methods
export async function handler(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params; // Awaiting `params`
  await connectToDatabase(); // Ensure database connection for all methods

  try {
    if (request.method === "GET") {
      // Fetch feedback by ID
      const feedback = await Feedback.findById(id);
      if (!feedback) {
        return NextResponse.json(
          { message: "Feedback not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(feedback, { status: 200 });
    } else if (request.method === "PUT") {
      // Update feedback by ID
      const body = await request.json();
      const { name, phone, email, subject, message } = body;

      // Validate required fields
      if (!name || !phone || !email || !subject || !message) {
        return NextResponse.json(
          { message: "Name, phone, email, subject, and message are required" },
          { status: 400 }
        );
      }

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
    } else if (request.method === "DELETE") {
      // Delete feedback by ID
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
    } else {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }
  } catch (error) {
    console.error(`Error processing ${request.method} request:`, error);
    return NextResponse.json(
      { message: `Failed to process ${request.method} request` },
      { status: 500 }
    );
  }
}

export { handler as GET, handler as PUT, handler as DELETE };
