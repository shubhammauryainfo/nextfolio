"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

interface Blog {
  id: number;
  title: string;
  image_Url: string;
  slug: string;
}

export default function BlogList(): JSX.Element {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs", {
          headers: {
            "x-api-key": apiKey || "",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data: Blog[] = await res.json();
        const reversedBlogs = data.reverse();
        setBlogs(reversedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [apiKey]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Blog Title Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800">Our Blogs</h2>
          <p className="text-gray-600 mt-4">
            Stay updated with the latest trends, tips, and tutorials in the tech
            world.
          </p>
        </div>
      </section>

      {/* Blog Cards */}
      <main className="flex-grow container mx-auto px-4 bg-slate-100 py-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 justify-items-center">
            {blogs.map((blog) => (
              <div
                key={blog.slug} // Ensure each child has a unique key
                className="bg-white rounded-lg shadow-lg w-full max-w-xs mx-auto overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
              >
                <Image
                  src={blog.image_Url}
                  alt={blog.title}
                  width={500}
                  height={500}
                  className="object-cover w-full h-52 rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{blog.title}</h3>
                  <a
                    href={`/blogs/${blog.slug}`}
                    className="text-blue-500 font-medium hover:underline mt-4 inline-block"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No blogs found.</p>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
