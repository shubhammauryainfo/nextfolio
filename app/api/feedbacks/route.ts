import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Feedback } from "@/models/Feedback";

// GET: Fetch all feedbacks
export async function GET() {
  try {
    await connectToDatabase();
    const feedbacks = await Feedback.find({});
    return NextResponse.json(feedbacks, { status: 200 });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return NextResponse.json(
      { message: "Failed to fetch feedbacks" },
      { status: 500 }
    );
  }
}

// POST: Create a new feedback
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, subject, message } = body;

    // Validate required fields
    if (!name || !phone || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Name, phone, email, subject, and message are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newFeedback = new Feedback({
      name,
      phone,
      email,
      subject,
      message,
    });

    const savedFeedback = await newFeedback.save();
    return NextResponse.json(savedFeedback, { status: 201 });
  } catch (error) {
    console.error("Error creating feedback:", error);
    return NextResponse.json(
      { message: "Failed to create feedback" },
      { status: 500 }
    );
  }
}
