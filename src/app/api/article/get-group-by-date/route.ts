import { dbConnect, dbDisconnect } from "@/lib/database";
import { Article } from "@/models/Article";
import { NextResponse } from "next/server";

export const config = {
  runtime: 'edge',
};

export async function GET() {
  await dbConnect();
  const response = await Article.find();
  await dbDisconnect();

  const hashmap = new Map()

  response.map((r) => {
    const createdDate = String(r.createdAt.getFullYear()) + "-" + String(r.createdAt.getMonth())
    if (hashmap.has(createdDate)) {
      hashmap.get(createdDate).push(r)
    } else {
      hashmap.set(createdDate, [r])
    }
  })

  const result = Object.fromEntries(hashmap)

  console.log(result)

  return NextResponse.json({ response: result });
  // return NextResponse.json({ response });
}