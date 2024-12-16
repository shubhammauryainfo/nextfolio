import { NextResponse } from "next/server";
import { createPool } from "@/lib/db";

// Helper function to find a blog by ID
async function findBlogById(id: number) {
  const pool = createPool();
  try {
    const [result] = await pool.query("SELECT * FROM blogs WHERE id = ?", [id]);
    return result[0];
  } catch (error) {
    throw new Error("Database query failed");
  }
}

// GET: Fetch a specific blog
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const blogId = parseInt(params.id); // Ensure blogId is an integer

  try {
    const blog = await findBlogById(blogId);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}
