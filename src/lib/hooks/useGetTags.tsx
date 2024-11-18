import { useEffect, useState } from "react"
import { ApiResponse, ArticleType } from "../types"

export const useGetTags = () => {
    const [tags, setTags] = useState<ArticleType[] | []>([])
    const [loading, setLoading] = useState(true)

    const getTags = async () => {
        const data = await fetch(`/api/tag`)
        const { response } = (await data.json()) as ApiResponse<ArticleType[]>
        setTags(response)
        setLoading(false)
    }

    useEffect(() => {
        getTags();
    }, [])

    return { tags, loading }
}