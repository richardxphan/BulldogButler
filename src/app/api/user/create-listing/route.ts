import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "../../../../../config/db";
import Item from "../../../../models/Item"; 

type SessionUser = {
    email: string;
    name?: string;
    image?: string;
  };
  
type SessionType = {
    user: SessionUser;
    expires: string;
};

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !token.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userEmail = token.email;

  try {
    await connectToDB();

    const body = await req.json();

    const newItem = await Item.create({
        userId: userEmail, 
        location: body.location,
        serviceType: body.serviceType,
        title: body.title,
        imageUrl: body.imageUrl,
        deadline: new Date(body.deadline),
        price: body.price,
        description: body.description,
      });

      return NextResponse.json(newItem, { status: 201 });
    } catch (err) {
      console.error("Submission error:", err);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}