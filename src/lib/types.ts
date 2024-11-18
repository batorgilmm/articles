export type TagType = {
    _id: string
    tag: string
}
export type ArticleType = {
    _id: string
    title: string
    description: string
    image: string
    url: string
    createdAt: string
    updatedAt: string
    tags: TagType[]
}

export type ApiResponse<T> = {
    response: T;
}

export type GroupedArticleType = [string, ArticleType[]];