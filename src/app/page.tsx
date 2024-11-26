'use client';
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetArticles } from "@/lib/hooks/useGetArticles";
import { ArticleSection } from "@/components/ArticleList";

export default function Home() {
  const [filter, setFilter] = useState<'current' | 'graduated'>('current');
  const { articlesGroupByDate, loading: articleLoading } = useGetArticles(filter);

  return (
    <div className="sm:pt-20">
      <Tabs
        defaultValue={filter}
        onValueChange={(value: string) => setFilter(value as 'current' | 'graduated')}
      >
        <TabsList>
          <TabsTrigger value="current">For students</TabsTrigger>
          <TabsTrigger value="graduated">Pinebaatars</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <ArticleSection
            articlesGroupByDate={articlesGroupByDate}
            loading={articleLoading}
          />
        </TabsContent>

        <TabsContent value="graduated">
          <ArticleSection
            articlesGroupByDate={articlesGroupByDate}
            loading={articleLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}