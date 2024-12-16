import { NextResponse } from "next/server";
import { createPool } from "@/lib/db";

// GET: Fetch all blog
export async function GET() {
  try {
    const pool = createPool(); // Assuming createPool initializes the connection
    const [blog] = await pool.query("SELECT * FROM blog");
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// POST: Create a new blog
export async function POST(req: Request) {
  try {
    const pool = createPool(); // Assuming createPool initializes the connection
    const { title, content, author, category } = await req.json();

    // Validate required fields
    if (!title || !content || !author || !category) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const query =
      "INSERT INTO blog (title, content, author, category, createdAt, updatedAt) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))";
    const [result] = await pool.query(query, [title, content, author, category]);

    const newBlog = {
      id: result.insertId,
      title,
      content,
      author,
      category,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
