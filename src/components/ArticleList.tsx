import { ArticleType } from "@/lib/types";
import { ArticleListSkeleton } from "./skeletons/ArticleList";
import LinkPreview from "./LinkPreview";

export const ArticleSection = ({
    articlesGroupByDate,
    loading
}: {
    articlesGroupByDate: [string, ArticleType[]][],
    loading: boolean
}) => {
    if (loading) return <ArticleListSkeleton />;

    return (
        <div className="h-full mt-10">
            {articlesGroupByDate.map(([date, articles]) => (
                <div key={date}>
                    <h6 className='text-muted-foreground text-sm md:text-xl font-light font-mono'>
                        {date}
                    </h6>
                    <div className='mt-4 relative space-y-4'>
                        {articles.map((article) => (
                            <LinkPreview key={article._id} article={article} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};