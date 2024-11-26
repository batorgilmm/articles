export const ArticleListSkeleton = () => {
    return (
        <div className="h-full animate-pulse mt-10">
            <div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="mt-4 relative space-y-4">
                    <div className="grid grid-cols-3 gap-6 text-left w-full relative border-b pb-4">
                        <div className="space-y-2 col-span-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4 my-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-full my-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="flex gap-1 pt-6">
                                <div className="h-4 bg-gray-200 rounded w-1/6 my-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/6 my-2"></div>
                            </div>
                        </div>
                        <div className="relative max-h-[160px] mt-4">
                            <div className="h-full w-full bg-gray-200 rounded-md"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
