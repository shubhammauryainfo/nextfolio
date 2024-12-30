import { NextResponse } from 'next/server';
import { User } from '../../../models/User'; // Adjust the path to your model file
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create a JWT token (ensure the JWT_SECRET is set in your environment)
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string, // The secret key should be set in your environment
      { expiresIn: '2h' } // Token expiration time (e.g., 2 hours for dev)
    );

    // Return the response with the JWT token
    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token, // Send the JWT token in the response body
    });

  } catch (err) {
    console.error("Error during login:", err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
