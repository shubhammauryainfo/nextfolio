import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

// GET: Fetch a single blog by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const blogId = params.id;
    await connectToDatabase();

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// PUT: Update a blog by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const blogId = params.id;
    const { title, content, author, category } = await req.json();

    // Validate required fields
    if (!title || !content || !author || !category) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectToDatabase();

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, content, author, category, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog updated successfully", blog: updatedBlog }, { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

// DELETE: Delete a blog by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const blogId = params.id;
    await connectToDatabase();

    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
