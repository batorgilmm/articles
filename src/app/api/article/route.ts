/* eslint-disable @typescript-eslint/no-unused-vars */

import { dbConnect, dbDisconnect } from "@/lib/database";
import { Article } from "@/models/Article";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const response = await Article.find();
  await dbDisconnect();

  console.log({ response });
  
  return NextResponse.json({ response });
}

export async function POST(req: NextRequest, _: unknown) {
  await dbConnect();
  const body = await req.json();
  const response = await Article.create(body);
  await dbDisconnect();

  console.log(response);

  return NextResponse.json({ response });
}
