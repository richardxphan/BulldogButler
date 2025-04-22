import { NextResponse } from 'next/server';
import { connectToDB } from '../../../../config/db';
import ItemSchema from '../../../models/Item';

export async function GET(req: Request) {
  await connectToDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
  }

  try {
    const item = await ItemSchema.findById(id);
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}