'use client';
import LinkPreview from "@/components/LinkPreview";
import { ArticleListSkeleton } from "@/components/skeletons/ArticleList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetArticles } from "@/lib/hooks/useGetArticles";
import { ArticleType } from '@/lib/types';
import { useState } from "react";

export default function Home() {
  const [filter, setFilter] = useState('current');
  const { articlesGroupByDate, loading: articleLoading } = useGetArticles(filter);

  const onValueChange = (value: string) => {
    setFilter(value)
  }

  return (
    <div className="sm:pt-20">
      <div>
        <Tabs defaultValue={filter} className="" onValueChange={onValueChange}>
          <TabsList>
            <TabsTrigger value="current">
              For students
            </TabsTrigger>
            <TabsTrigger value="graduated">Pinebaatars</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <div className="h-full">
              {articleLoading ? <ArticleListSkeleton /> : articlesGroupByDate.map(([date, articles]) => (
                <div key={date}>
                  <h6 className='text-muted-foreground text-sm md:text-xl font-light mt-10 font-mono'>{date}</h6>
                  <div className='mt-4 relative space-y-4'>
                    {
                      articles.map((article: ArticleType) => <LinkPreview key={article._id} article={article} />)
                    }
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="graduated">
            <div className="h-full">
              {articleLoading ? <ArticleListSkeleton /> : articlesGroupByDate.map(([date, articles]) => (
                <div key={date}>
                  <h6 className='text-muted-foreground text-sm md:text-xl font-light mt-10 font-mono'>{date}</h6>
                  <div className='mt-4 relative space-y-4'>
                    {
                      articles.map((article: ArticleType) => <LinkPreview key={article._id} article={article} />)
                    }
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

        </Tabs>




        {/* <h1 className="text-4xl text-left font-semibold text-[#2A1C00] font-mono">
          Articles
        </h1> */}



      </div>
    </div>
  );
}
