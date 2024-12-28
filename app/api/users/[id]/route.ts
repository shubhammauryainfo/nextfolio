import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models/User";
import bcrypt from "bcrypt";

// Unified handler for GET, PUT, DELETE methods
export async function handler(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params; // Await `params` to access the `id`
  await connectToDatabase(); // Ensure the database connection

  try {
    if (request.method === "GET") {
      // Fetch user by ID
      const user = await User.findById(id).select("-password"); // Exclude password
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(user, { status: 200 });
    } else if (request.method === "PUT") {
      // Update user by ID
      const body = await request.json();
      const { name, email, password } = body;

      // Validate required fields
      if (!name || !email) {
        return NextResponse.json(
          { message: "Name and email are required" },
          { status: 400 }
        );
      }

      const updateData: Record<string, any> = { name, email, updatedAt: new Date() };

      // If password is provided, hash it
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
      }

      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      }).select("-password"); // Exclude password

      if (!updatedUser) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(updatedUser, { status: 200 });
    } else if (request.method === "DELETE") {
      // Delete user by ID
      const deletedUser = await User.findByIdAndDelete(id).select("-password"); // Exclude password
      if (!deletedUser) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "User deleted successfully" },
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
