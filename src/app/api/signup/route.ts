import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '../../../models/UserSchema';
import dbConnect from '../../../lib/dbConnect';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 🔒 Validate fields
    if (!email || !password) {
      return NextResponse.json({ message: 'Missing email or password' }, { status: 400 });
    }

    // 🔒 Restrict to uga.edu domain
    if (!email.endsWith('@uga.edu')) {
      return NextResponse.json({ message: 'Email must be a uga.edu address' }, { status: 400 });
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
