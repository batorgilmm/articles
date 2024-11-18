/* eslint-disable @typescript-eslint/no-unused-vars */
import { dbConnect, dbDisconnect } from "@/lib/database";
import { Tag } from "@/models/Tag";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    const response = await Tag.find();
    return NextResponse.json({ success: true, response })
}

export async function POST(req: NextRequest, _: unknown) {
    await dbConnect();
    const body = await req.json();
    const response = await Tag.create(body);
    return NextResponse.json({ success: true, response })
}