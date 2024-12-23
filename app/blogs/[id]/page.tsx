"use client";

import React, { useState, useEffect } from "react";

interface Blog {
  title: string;
  content: string;
  image_Url?: string;
  author: string;
  publishedAt?: string;
  updatedAt?: string;
  category: string;
}

async function fetchBlog(id: string): Promise<Blog | null> {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!apiKey) {
    console.error("API key is missing. Check your .env.local configuration.");
    return null;
  }

  try {
    const response = await fetch(`/api/blogs/${id}`, {
      headers: {
        "x-api-key": apiKey,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch blog with id ${id}:`, await response.text());
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    return null;
  }
}

const BlogPage = ({ params }: { params: { id: string } }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadBlog() {
      const { id } = params; // Access params directly in the client component
      const blogData = await fetchBlog(id);
      setBlog(blogData);
      setLoading(false);
    }

    loadBlog();
  }, [params]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  if (!blog) {
    return <p className="text-center mt-10 text-gray-600">Blog not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-4">
        Published on{" "}
        {blog.publishedAt
          ? new Date(blog.publishedAt).toLocaleDateString()
          : "Unknown"}{" "}
        | Updated on{" "}
        {blog.updatedAt ? new Date(blog.updatedAt).toLocaleDateString() : "Unknown"}
      </p>
      {blog.image_Url && (
        <img
          src={blog.image_Url}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      <p className="text-gray-700 leading-relaxed">{blog.content}</p>
      <div className="mt-6">
        <span className="text-sm font-semibold text-gray-500">Category:</span>{" "}
        <span className="text-gray-800">{blog.category}</span>
      </div>
      <div className="mt-6">
        <span className="text-sm font-semibold text-gray-500">Author:</span>{" "}
        <span className="text-gray-800">{blog.author}</span>
      </div>
    </div>
  );
};

export default BlogPage;
