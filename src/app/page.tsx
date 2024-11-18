'use client';
import LinkPreview from "@/components/LinkPreview";
import { ArticleListSkeleton } from "@/components/skeletons/ArticleList";
import { useGetArticles } from "@/lib/hooks/useGetArticles";
import { useGetTags } from "@/lib/hooks/useGetTags";
import { ArticleType } from '@/lib/types';

export default function Home() {
  const { articlesGroupByDate, loading } = useGetArticles();
  const { tags, loading: tagLoading } = useGetTags();

  console.log(tags, tagLoading)

  if (loading) {
    return <ArticleListSkeleton />
  }

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
                  articles.map((article: ArticleType) => <LinkPreview key={article._id} article={article} />)
                }
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
