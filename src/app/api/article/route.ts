/* eslint-disable @typescript-eslint/no-unused-vars */

import { dbConnect, dbDisconnect } from "@/lib/database";
import { Article } from "@/models/Article";
import { Tag } from "@/models/Tag";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: 'edge',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get('filter');

  console.log(filter)

  await dbConnect();
  const response = await Article.find({ category: filter }).populate({ path: 'tags', model: Tag });
  return NextResponse.json({ response });
}

export async function POST(req: NextRequest, _: unknown) {
  await dbConnect();
  const body = await req.json();
  const response = await Article.create(body);

  return NextResponse.json({ response });
}