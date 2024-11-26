import Link from "next/link";
import Image from "next/image";
import { ArticleType } from "@/lib/types";
import { Badge } from "./ui/badge";

const LinkPreview = ({ article }: { article: ArticleType }) => {
    return (
        <Link
            href={article.url}
            target="_blank"
            className="grid grid-cols-3 cursor-pointer gap-6 text-left w-full relative border-b pb-4 min-h-[160px]"
            style={{
                textDecoration: "none",
            }}>
            <div className="flex flex-col justify-between space-y-2 col-span-2">
                <div>
                    <h3 className="text-sm md:text-xl font-bold line-clamp-2">
                        {article.title}
                    </h3>
                    <p className="text-xs md:text-base text-stone-600 line-clamp-3">{article.description}</p>
                </div>
                <div className="space-x-1">
                    {
                        article.tags.map((tag, idx) => (
                            <Badge variant='outline' key={tag.tag + idx} className="text-xs">
                                #{tag.tag}
                            </Badge>
                        ))
                    }
                </div>
            </div>
            <div className="relative max-h-[160px]">
                <Image
                    width={150}
                    height={60}
                    src={article.image}
                    alt="Link Preview"
                    className="object-cover m-0 h-full w-full max-h-[160px] rounded-md"
                />
            </div>
        </Link>
    );
}

export default LinkPreview;
