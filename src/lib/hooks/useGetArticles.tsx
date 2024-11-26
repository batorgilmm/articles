import { useEffect, useMemo, useState } from "react"
import { ApiResponse, ArticleType, GroupedArticleType } from "../types"

export const useGetArticles = (filter: string) => {
    const [articles, setArticles] = useState<ArticleType[] | []>([])
    const [loading, setLoading] = useState(true)

    const getArticles = async () => {
        const data = await fetch(`/api/article?filter=${filter}`)
        const { response } = (await data.json()) as ApiResponse<ArticleType[]>
        setArticles(response)
    }

    useEffect(() => {
        getArticles();
    }, [filter])

    const articlesGroupByDate = useMemo(() => {
        const groupedArticles = articles.reduce<Map<string, ArticleType[]>>((acc, article) => {
            const createdDate = `${new Date(article.createdAt).getFullYear()}-${new Date(article.createdAt).getMonth()}`;
            if (!acc.has(createdDate)) {
                acc.set(createdDate, []);
            }
            acc.get(createdDate)!.push(article);
            return acc;
        }, new Map());

        const result: GroupedArticleType[] = Array.from(groupedArticles.entries());
        setLoading(false)
        return result
    }, [articles])

    return { articles, articlesGroupByDate, loading }
}