import Link from "next/link";
import { JSDOM } from "jsdom";
import Image from "next/image";

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

async function LinkPreview({ url }: { url: string }) {
    const data = await extractMetaTags(url);

    if (!data) {
        return <p>Failed to fetch link preview.</p>;
    }
    return (
        <Link
            href={url}
            target="_blank"
            className="grid grid-cols-3 cursor-pointer gap-6 text-left w-full relative border-b pb-4"
            style={{
                textDecoration: "none",
            }}
        >
            <div className=" space-y-2 col-span-2">
                <h3 className="text-sm md:text-xl font-bold line-clamp-2">
                    {data.title}
                </h3>
                <p className="text-xs md:text-base text-stone-600 line-clamp-3">{data.description}</p>
            </div>

            <div className="relative max-h-[160px]">
                <Image
                    width={150}
                    height={60}
                    src={data.image}
                    alt="Link Preview"
                    className="object-cover m-0 h-full w-full max-h-[160px] rounded-md"
                />
            </div>
        </Link>
    );
}

export default LinkPreview;
