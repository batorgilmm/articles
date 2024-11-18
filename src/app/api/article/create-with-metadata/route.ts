/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { JSDOM } from "jsdom"
import { dbConnect, dbDisconnect } from "@/lib/database";
import { Article } from "@/models/Article";

const extractMetaTags = async (url: string) => {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;
        const metaTags = Array.from(document.querySelectorAll("meta")).reduce(
            (tags: Record<string, string>, meta: HTMLMetaElement) => {
                const name =
                    meta.getAttribute("name") ||
                    meta.getAttribute("property") ||
                    meta.getAttribute("itemprop");
                const content = meta.getAttribute("content");

                if (name && content) {
                    tags[name] = content;
                }

                return tags;
            },
            {}
        );

        return {
            title:
                document.title || metaTags["og:title"] || metaTags["twitter:title"],
            description:
                metaTags.description ||
                metaTags["og:description"] ||
                metaTags["twitter:description"],
            image:
                metaTags.image || metaTags["og:image"] || metaTags["twitter:image"],
        };
    } catch (error) {
        console.error("Error fetching Open Graph details", error);
    }
};

export async function POST(req: NextRequest, _: unknown) {
    const body = await req.json();
    await dbConnect();
    const { url, tags } = body;
    const metadata = await extractMetaTags(url)
    const res = await Article.create({ ...metadata, url, tags })

    return NextResponse.json({ success: true, res })
}