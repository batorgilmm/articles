import fetch from 'node-fetch';
import LinkPreview from "@/components/LinkPreview";


type ArticleType = {
  _id: string
  url: string
  createdAt: string
  updatedAt: string
}

type ApiResponse = {
  response: ArticleType[];
}

export default async function Home() {
  console.log(process.env.NEXT_PUBLIC_ORIGIN_URL);
  const data = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/article`)
  const { response: articles } = (await data.json()) as ApiResponse

  return (
    <div className="min-h-screen sm:p-20">
      <div className="max-w-[616px] mx-auto">
        <h1 className="text-4xl text-left font-semibold">
          Articles
        </h1>

        <div className=" h-full mt-10 relative space-y-4">
          {articles.map((article) => (
            <LinkPreview key={article._id} url={article.url} />
          ))}
        </div>
      </div>
    </div>
  );
}
