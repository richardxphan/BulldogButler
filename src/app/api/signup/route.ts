import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '../../../models/UserSchema'; 
import dbConnect from '../../../lib/dbConnect';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!email.endsWith('@uga.edu')) {
      return NextResponse.json(
        { message: 'Email must be a uga.edu address' },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('[SIGNUP_ERROR]', err);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
