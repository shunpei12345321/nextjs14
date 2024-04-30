import Link from "next/link";
import { BlogType } from "./types";

async function fetchAllBlogs() {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store", //SSR
  });
  const data = await res.json();
  //console.log(data);
  return data.blogs;
}

export default async function Home() {
  const blogs = await fetchAllBlogs();

  return (
    <div className="w-screen">
      <div className="bg-black text-white p-2 flex items-center justify-center">
        My Blog
      </div>
      <div className="h-screen flex flex-col items-center scroll-py-5">
        <h1 className="font-bold text-5xl pt-10">Home</h1>
        <p className="px-20">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam,
          repudiandae qui officia, ab veritatis, error animi doloremque illum
          aliquid dolores optio molestias. Debitis velit iusto illum obcaecati
          itaque incidunt eum.{" "}
        </p>
        <Link
          href="/blog/create"
          className=" px-2 my-4 border-2 border-green-600 text-green-900"
        >
          新規BLOG
        </Link>
        <div className="w-full space-y-4 flex flex-col items-center">
          {blogs.map((blog: BlogType) => (
            <div className="w-2/3 px-4 py-2 border rounded-lg border-gray-700">
              <div className="flex justify-between">
                <h1 className="font-bold text-xl">{blog.title}</h1>
                <div className="space-x-5">
                  <Link href="blog/edit" className="border-2 px-2">
                    修正
                  </Link>
                  <button>削除</button>
                </div>
              </div>
              <h2 className="text-sm">{blog.createdAt}</h2>
              <div>{blog.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
