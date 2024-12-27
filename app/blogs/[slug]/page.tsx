"use client";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface Blog {
  title: string;
  content: string;
  image_Url?: string;
  slug: string;
  author: string;
  publishedAt?: string;
  updatedAt?: string;
  category: string;
}

interface Comment {
  name: string;
  blogTitle: string;
  phone: string;
  email: string;
  message: string;
  createdAt: Date;
}

async function fetchBlog(slug: string): Promise<Blog | null> {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!apiKey) {
    console.error("API key is missing. Check your .env.local configuration.");
    return null;
  }

  try {
    const response = await fetch(`/api/blogs/${slug}`, {
      headers: {
        "x-api-key": apiKey,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch blog with slug ${slug}:`, await response.text());
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    return null;
  }
}

async function fetchComments(blogTitle: string): Promise<Comment[]> {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!apiKey) {
    console.error("API key is missing. Check your .env.local configuration.");
    return [];
  }

  try {
    const response = await fetch(`/api/comments?blogTitle=${encodeURIComponent(blogTitle)}`, {
      headers: {
        "x-api-key": apiKey,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch comments for blog title ${blogTitle}:`, await response.text());
      return [];
    }

    const comments = await response.json();
    return comments.reverse(); // Reverse the order of comments
  } catch (error) {
    console.error(`Error fetching comments for blog title ${blogTitle}:`, error);
    return [];
  }
}

async function postComment(newComment: Comment): Promise<boolean> {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!apiKey) {
    console.error("API key is missing. Check your .env.local configuration.");
    return false;
  }

  try {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(newComment),
    });

    return response.ok;
  } catch (error) {
    console.error("Error posting comment:", error);
    return false;
  }
}

const BlogPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<Comment>({
    name: "",
    blogTitle: "",
    phone: "",
    email: "",
    message: "",
    createdAt: new Date(),
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadBlog() {
      const { slug } = await params; // Unwrapping params
      const blogData = await fetchBlog(slug);
      if (blogData) {
        setBlog(blogData);
        setNewComment((prev) => ({ ...prev, blogTitle: blogData.title }));
        const commentsData = await fetchComments(blogData.title);
        setComments(commentsData);
      }
      setLoading(false);
    }

    loadBlog();
  }, [params]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    Swal.fire({
      title: "Submitting...",
      text: "Your comment is being posted.",
      icon: "info",
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    const success = await postComment(newComment);
    if (success) {
      Swal.fire({
        title: "Success!",
        text: "Your comment has been posted.",
        icon: "success",
      });
      setComments((prev) => [{ ...newComment, createdAt: new Date() }, ...prev]); // Add new comment to the top
      setNewComment({
        name: "",
        blogTitle: blog?.title || "",
        phone: "",
        email: "",
        message: "",
        createdAt: new Date(),
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "There was an error posting your comment. Please try again.",
        icon: "error",
      });
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  if (!blog) {
    return <p className="text-center mt-10 text-gray-600">Blog not found.</p>;
  }

  return (
    <div>
      <Header />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {blog.image_Url && (
            <Image
              src={blog.image_Url}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          )}
          <p className="text-gray-700 leading-relaxed">{blog.content}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-[500px] overflow-y-auto border rounded-lg p-4 shadow bg-white">
            <h2 className="text-lg font-semibold mb-4">Comments</h2>
            {comments.filter(comment => comment.blogTitle === blog.title).length > 0 ? (
              comments.filter(comment => comment.blogTitle === blog.title).map((comment, index) => (
                <div key={index} className="mb-4 border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium">{comment.name}</h3>
                      <p className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{comment.message}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
          <div className="h-[500px] bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Leave a Comment</h2>
            <form onSubmit={handleCommentSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    value={newComment.name}
                    onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="Enter your phone number"
                    value={newComment.phone}
                    onChange={(e) =>
                      setNewComment({ ...newComment, phone: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={newComment.email}
                    onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Your Comment
                </label>
                <textarea
                  id="message"
                  placeholder="Write your comment here..."
                  value={newComment.message}
                  onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2 resize-none"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  Post Your Comment
                </button>
              </div>
            </form >
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
