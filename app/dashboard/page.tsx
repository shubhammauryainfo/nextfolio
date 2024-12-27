'use client';
import React, { useState, useEffect } from "react";
import Header from "@/components/dashHeader";
import Footer from "@/components/Footer";

// Function to fetch and count data from API
async function fetchDataCount(endpoint: string) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const response = await fetch(`/api/${endpoint}`, {
    headers: {
      "x-api-key": apiKey,
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
    <div>
      <Header />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800">Total Blogs</h2>
            <p className="text-2xl font-bold text-gray-800">{blogsCount}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800">Total Comments</h2>
            <p className="text-2xl font-bold text-gray-800">{commentsCount}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800">Total Feedback</h2>
            <p className="text-2xl font-bold text-gray-800">{feedbackCount}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800">Total Users</h2>
            <p className="text-2xl font-bold text-gray-800">{usersCount}</p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
