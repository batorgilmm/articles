import fetch from 'node-fetch';
import LinkPreview from "@/components/LinkPreview";
import { ApiResponse, ArticleType, GroupedArticleType } from '@/lib/types';
import { headers } from 'next/headers';

export default async function Home() {
  const headersList = headers();
  const referer = (await headersList).get('referer');

  if (!referer) {
    throw new Error("Referer header is missing");
  }

  const data = await fetch(`${referer}/api/article`)
  const { response: articles } = (await data.json()) as ApiResponse<ArticleType[]>

  const groupedArticles = articles.reduce<Map<string, ArticleType[]>>((acc, article) => {
    const createdDate = `${new Date(article.createdAt).getFullYear()}-${new Date(article.createdAt).getMonth()}`;
    if (!acc.has(createdDate)) {
      acc.set(createdDate, []);
    }
    acc.get(createdDate)!.push(article);
    return acc;
  }, new Map());

  const articlesGroupByDate: GroupedArticleType[] = Array.from(groupedArticles.entries());

  return (
    <div className="sm:pt-20">
      <div className="">
        <h1 className="text-4xl text-left font-semibold text-[#2A1C00] font-mono">
          Articles
        </h1>

        <div className=" h-full">
          {articlesGroupByDate.map(([date, articles]) => (
            <div key={date}>
              <h6 className='text-[#80673D] text-sm md:text-xl font-light mt-10 font-mono'>{date}</h6>
              <div className='mt-4 relative space-y-4'>
                {
                  articles.map((article: ArticleType) => <LinkPreview key={article._id} url={article.url} />)
                }
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
