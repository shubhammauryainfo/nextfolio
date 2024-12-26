/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import mongoose from "mongoose";

/**
 * Retrieves a blog post by its slug
 * @param req - The Next.js request object
 * @param params - Route parameters containing the blog slug
 * @returns {Promise<NextResponse>} The blog post data or error response
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } } // Changed 'id' to 'slug'
) {
  try {
    const { slug } = params; // Changed 'id' to 'slug'
    await connectToDatabase();

    const blog = await Blog.findOne({ slug }); // Changed to find by slug

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return NextResponse.json({ error: "Invalid slug format" }, { status: 400 }); // Updated error message
    }
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// PUT: Update a blog by slug
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } } // Changed 'id' to 'slug'
) {
  try {
    const { slug } = params; // Changed 'id' to 'slug'
    const { title, content, author, category } = await req.json();
    
    // Sanitize inputs
    const sanitizedData = {
      title: title?.trim(),
      content: content?.trim(),
      author: author?.trim(),
      category: category?.trim()
    };

    if (Object.values(sanitizedData).some(val => !val)) {
      return NextResponse.json({ error: "All fields are required and cannot be empty" }, { status: 400 });
    }

    await connectToDatabase();

    const updatedBlog = await Blog.findOneAndUpdate( // Changed to find by slug
      { slug },
      { title, content, author, category, updatedAt: new Date() },
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

// DELETE: Delete a blog by slug
export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } } // Changed 'id' to 'slug'
) {
  try {
    const { slug } = params; // Changed 'id' to 'slug'
    await connectToDatabase();

    const deletedBlog = await Blog.findOneAndDelete({ slug }); // Changed to find by slug

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