export type ArticleType = {
    _id: string
    url: string
    createdAt: string
    updatedAt: string
}

export type ApiResponse<T> = {
    response: T;
}

export type GroupedArticleType = [string, ArticleType];