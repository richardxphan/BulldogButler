import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '../../../../models/UserSchema';
import Item from '../../../../models/Item'; 
import { getServerSession } from 'next-auth';
import { authConfig } from "../../../../../auth.config";

export async function POST(req: NextRequest) {
  await mongoose.connect(process.env.MONGODB_URI!);

  const session = await getServerSession( authConfig ) as {
    user?: { email?: string }
  };

  const userEmail = session.user?.email;
  const { itemId } = await req.json();

  if (!itemId) {
    return NextResponse.json({ error: 'Missing itemId' }, { status: 400 });
  }

  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (!user.listings.includes(itemId)) {
    user.listings.push(itemId);
    await user.save();
  }

  return NextResponse.json({ message: 'Item added to user listings!' });
}
