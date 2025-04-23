import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDB } from '../../../../config/db';
import Item from '../../../models/Item';
import User from '../../../models/UserSchema';

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !token.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDB();

    const user = await User.findOne({ email: token.email }).populate('listings');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const postedListings = await Item.find({ userId: token.email });
    const acceptedListings = user.listings || [];

    return NextResponse.json({ ...user.toObject(), postedListings, acceptedListings }, { status: 200 });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !token.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const data = await req.json();
  const { firstName, lastName, phone, bio, profileImage } = data;

  try {
    await connectToDB();

    const updatedUser = await User.findOneAndUpdate(
      { email: token.email },
      {
        $set: {
          firstName,
          lastName,
          phone,
          bio,
          profileImage,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error('Failed to update user profile:', err);
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !token.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { itemId } = await req.json();

  try {
    await connectToDB();
    const user = await User.findOne({ email: token.email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    user.listings = user.listings.filter((id: any) => id.toString() !== itemId);
    await user.save();

    return NextResponse.json({ message: 'Accepted job removed' });
  } catch (err) {
    console.error('Failed to remove accepted job:', err);
    return NextResponse.json({ message: 'Removal failed' }, { status: 500 });
  }
}
