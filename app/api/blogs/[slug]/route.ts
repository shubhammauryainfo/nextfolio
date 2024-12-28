

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import mongoose from "mongoose";

/**
 * Retrieves a blog post by its slug
 * @param req - The Next.js request object
 * @param context - Route context containing dynamic parameters
 */
export async function GET(
  req: NextRequest,
 
  context: { params: { slug: string } }
) {
  try {
    const { slug } = await context.params; // Await params
    await connectToDatabase();

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return NextResponse.json({ error: "Invalid slug format" }, { status: 400 });
    }
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

/**
 * Updates a blog post by its slug
 * @param req - The Next.js request object
 * @param context - Route context containing dynamic parameters
 */
export async function PUT(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    const { slug } = await context.params; // Await params
    const { title, content, author, category } = await req.json();

    // Sanitize inputs
    const sanitizedData = {
      title: title?.trim(),
      content: content?.trim(),
      author: author?.trim(),
      category: category?.trim(),
    };

    if (Object.values(sanitizedData).some((val) => !val)) {
      return NextResponse.json(
        { error: "All fields are required and cannot be empty" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      { ...sanitizedData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog updated successfully", blog: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

/**
 * Deletes a blog post by its slug
 * @param req - The Next.js request object
 * @param context - Route context containing dynamic parameters
 */
export async function DELETE(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    const { slug } = await context.params; // Await params
    await connectToDatabase();

    const deletedBlog = await Blog.findOneAndDelete({ slug });

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
