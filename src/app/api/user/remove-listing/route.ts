import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '../../../../../auth.config';
import User from '../../../../models/UserSchema';
import { connectToDB } from '../../../../../config/db';

export async function POST(req: NextRequest) {
  await connectToDB();

  const session = await getServerSession(authConfig);
  const { itemId } = await req.json();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.listings = user.listings.filter((id: any) => id.toString() !== itemId);
    await user.save();

    return NextResponse.json({ message: 'Removed from listings' }, { status: 200 });
  } catch (err) {
    console.error('Failed to remove listing:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}