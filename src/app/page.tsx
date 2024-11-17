import fetch from 'node-fetch';
import LinkPreview from "@/components/LinkPreview";
import { ApiResponse, ArticleType, GroupedArticleType } from '@/lib/types';

export default async function Home() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/article/get-group-by-date`)
  const { response } = (await data.json()) as ApiResponse<keyof GroupedArticleType>

  const articles = Object.entries(response)

  return (
    <div className="sm:pt-20">
      <div className="">
        <h1 className="text-4xl text-left font-semibold text-[#2A1C00] font-mono">
          Articles
        </h1>

        <div className=" h-full">
          {articles.map(([date, article]) => (
            <div key={date}>
              <h6 className='text-[#80673D] text-sm md:text-xl font-light mt-10 font-mono'>{date}</h6>
              <div className='mt-4 relative space-y-4'>
                {
                  article.map((a: ArticleType) => <LinkPreview key={a._id} url={a.url} />)
                }
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
