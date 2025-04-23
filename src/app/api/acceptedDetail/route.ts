import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '../../../../config/db';
import Item from '../../../models/Item';

export async function GET(req: NextRequest) {
  await connectToDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing item ID' }, { status: 400 });
  }

  try {
    const item = await Item.findById(id);
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (err) {
    console.error('Error fetching item detail:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
