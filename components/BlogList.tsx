'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";

// Define the types based on your provided model
interface Blog {
  id: string;
  title: string;
  description: string;
  image_Url: string;
  slug: string;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const api = process.env.NEXT_PUBLIC_API_KEY;
  // Fetch blogs when component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs", {
          headers: {
            "x-api-key": api || "", // Replace with actual API key
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const blogsData = await res.json();
        setBlogs(blogsData.slice(-3).reverse()); // Get the latest 3 blogs in reverse order
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <section id="recent-blogs" className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-8">Recent Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-8 md:px-20 lg:px-32">
        {blogs.map((blog) => (
          <div
            key={blog.slug}
            className="p-4 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center font-semibold text-gray-800 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={blog.image_Url}
              alt={blog.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <span className="text-xl mb-2">{blog.title}</span>
            <p className="text-gray-600 text-center mb-4">{blog.description}</p>
            <Link href={`/blogs/${blog.slug}`}
               className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
                Read More
              
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogList;
