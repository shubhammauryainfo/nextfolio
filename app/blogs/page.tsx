"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import the API key from environment variables
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

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
        // Sort blogs in reverse order to show the latest ones first
        const sortedBlogs = data.sort((a, b) => b.id - a.id);
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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
<main className="flex-grow container mx-auto px-4 py-8">
  {loading ? (
    <p className="text-center text-gray-500">Loading blogs...</p>
  ) : blogs.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
        >
          <img
            src={blog.image_Url}
            alt={blog.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800">
              {blog.title}
            </h3>
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
