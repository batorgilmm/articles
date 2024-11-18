/* eslint-disable @typescript-eslint/no-unused-vars */

import { dbConnect, dbDisconnect } from "@/lib/database";
import { Article } from "@/models/Article";
import { Tag } from "@/models/Tag";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: 'edge',
};

export async function GET() {
  await dbConnect();
  const response = await Article.find().populate({ path: 'tags', model: Tag });
  console.log(response)
  return NextResponse.json({ response });
}

export async function POST(req: NextRequest, _: unknown) {
  await dbConnect();
  const body = await req.json();
  const response = await Article.create(body);

  return NextResponse.json({ response });
}