/* eslint-disable @typescript-eslint/no-unused-vars */
import { dbConnect, dbDisconnect } from "@/lib/database";
import { Article } from "@/models/Article";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, _: unknown) {
  try {
    const body = await req.json();
    await dbConnect();
    const response = await Article.insertMany(body);
    await dbDisconnect();
    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to insert articles");
  }
}