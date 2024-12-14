import { NextResponse } from 'next/server';
import { createPool } from '@/lib/db';

// Initialize MySQL connection pool
const pool = createPool();

// GET Handler: Fetch all blogs or a single blog by ID
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      // Fetch a single blog by ID
      const [rows] = await pool.query('SELECT * FROM blog WHERE id = ?', [id]);
      if (rows.length === 0) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
      return NextResponse.json(rows[0], { status: 200 });
    }

    // Fetch all blogs
    const [rows] = await pool.query('SELECT * FROM blog ORDER BY created_at DESC');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog(s):', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST Handler: Create a new blog
export async function POST(req: Request) {
  const { title, content, author, image_url, category, tags, published } = await req.json();

  // Validation
  if (!title || !content || !author) {
    return NextResponse.json({ error: 'Title, content, and author are required' }, { status: 400 });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO blog (title, content, author, image_url, category, tags, published) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, content, author, image_url || null, category || null, tags || null, published || false]
    );

    return NextResponse.json(
      { message: 'Blog created successfully', id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}

// PUT Handler: Update an existing blog by ID
export async function PUT(req: Request) {
  const { id, title, content, author, image_url, category, tags, published } = await req.json();

  // Validation
  if (!id || !title || !content || !author) {
    return NextResponse.json({ error: 'ID, title, content, and author are required' }, { status: 400 });
  }

  try {
    await pool.query(
      'UPDATE blog SET title = ?, content = ?, author = ?, image_url = ?, category = ?, tags = ?, published = ? WHERE id = ?',
      [title, content, author, image_url || null, category || null, tags || null, published || false, id]
    );

    return NextResponse.json({ message: 'Blog updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE Handler: Delete a blog by ID
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
  }

  try {
    await pool.query('DELETE FROM blog WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
