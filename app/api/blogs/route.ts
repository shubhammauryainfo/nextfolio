import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';

// GET: Fetch all blogs
export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({});
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { message: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST: Create a new blog
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, author, category } = body;

    if (!title || !content || !author || !category) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const newBlog = new Blog({
      title,
      content,
      author,
      category,
    });

    const savedBlog = await newBlog.save();
    return NextResponse.json(savedBlog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { message: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
