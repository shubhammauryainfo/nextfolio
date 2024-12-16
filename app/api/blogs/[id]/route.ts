import { NextResponse } from "next/server";
import { createPool } from "@/lib/db";

const pool = createPool(); // Initialize the MySQL connection pool

// GET: Fetch a single blog by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const blogId = params.id;

    const [blogs] = await pool.query("SELECT * FROM blog WHERE id = ?", [blogId]);

    if (blogs.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blogs[0], { status: 200 });
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

    const query =
      "UPDATE blog SET title = ?, content = ?, author = ?, category = ? WHERE id = ?";
    const [result] = await pool.query(query, [title, content, author, category, blogId]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

// DELETE: Delete a blog by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const blogId = params.id;

    const query = "DELETE FROM blog WHERE id = ?";
    const [result] = await pool.query(query, [blogId]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
