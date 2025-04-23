import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '../../../../config/db';
import Item from '../../../models/Item';

export async function GET(req: NextRequest) {
  await connectToDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ message: 'No ID provided' }, { status: 400 });

  const item = await Item.findById(id);
  if (!item) return NextResponse.json({ message: 'Item not found' }, { status: 404 });

  return NextResponse.json(item);
}

export async function PUT(req: NextRequest) {
  await connectToDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ message: 'No ID provided' }, { status: 400 });

  const body = await req.json();

  const updateFields = {
    location: body.location,
    serviceType: body.serviceType,
    title: body.title,
    imageUrl: body.imageUrl,
    deadline: new Date(body.deadline), 
    price: parseFloat(body.price), 
    description: body.description,
  };

  const updated = await Item.findByIdAndUpdate(id, updateFields, { new: true });

  if (!updated) return NextResponse.json({ message: 'Item not found' }, { status: 404 });

  return NextResponse.json(updated);
}


export async function DELETE(req: NextRequest) {
  await connectToDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ message: 'No ID provided' }, { status: 400 });

  await Item.findByIdAndDelete(id);

  return NextResponse.json({ message: 'Deleted successfully' });
}
