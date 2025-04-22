import { NextResponse } from 'next/server';
import { connectToDB } from '../../../../config/db';
import Item from '../../../models/Item';

export async function GET(req: Request) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const excludeUserId = url.searchParams.get('excludeUserId');

    const items = excludeUserId
      ? await Item.find({ userId: { $ne: excludeUserId } }) 
      : await Item.find({});

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();

    const body = await req.json();
    const newItem = new Item(body);
    
    await newItem.save();
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error creating item:', error);
    return new NextResponse('Failed to create item', { status: 500 });
  }
}