import { NextResponse } from 'next/server';
import { createPool } from '@/lib/db';

const pool = createPool();

// GET Handler: Fetch all users
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST Handler: Create a new user
export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return NextResponse.json(
      { id: result.insertId, name, email },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

// PUT Handler: Update an existing user
export async function PUT(req: Request) {
  const { id, name, email, password } = await req.json();

  if (!id || !name || !email || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    await pool.query(
      'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
      [name, email, password, id]
    );
    return NextResponse.json(
      { message: 'User updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE Handler: Delete a user
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
