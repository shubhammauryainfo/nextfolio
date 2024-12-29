'use client';
import React, { useState, useEffect } from "react";
import Header from "@/components/Afternav";
import Layout from "@/components/Layout";
import BlogList from "@/components/BlogList";

// Function to fetch and count data from API
async function fetchDataCount(endpoint: string) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const response = await fetch(`/api/${endpoint}`, {
    headers: {
      "x-api-key": apiKey || "",
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.length; // Count the number of items in the array
  }

  return 0;
}

const Dashboard = () => {
  const [blogsCount, setBlogsCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    async function loadCounts() {
      const [blogs, comments, feedbacks, users] = await Promise.all([
        fetchDataCount("blogs"),
        fetchDataCount("comments"),
        fetchDataCount("feedbacks"),
        fetchDataCount("users")
      ]);

      setBlogsCount(blogs);
      setCommentsCount(comments);
      setFeedbackCount(feedbacks);
      setUsersCount(users);
    }
    loadCounts();
  }, []);

  return (
    <Layout>
      <Header title="Dashboard" />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Blogs</h2>
            <p className="text-3xl font-bold text-gray-800">{blogsCount}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Comments</h2>
            <p className="text-3xl font-bold text-gray-800">{commentsCount}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Feedback</h2>
            <p className="text-3xl font-bold text-gray-800">{feedbackCount}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-gray-800">{usersCount}</p>
          </div>
        </div>
      </div>
      <BlogList/>
      </Layout>
  );
};

export default Dashboard;
