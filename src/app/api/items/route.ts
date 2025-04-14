import { NextResponse } from 'next/server';
import { connectToDB } from '../../../../config/db';
import Item from '../../../models/Item';

export async function GET() {
  try {
    await connectToDB();
    const items = await Item.find({});
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
