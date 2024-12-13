import React from 'react';
import Image from 'next/image';

export default function Dashboard() {
  const categories = [
    { id: 1, name: 'Tech', posts: 42 },
    { id: 2, name: 'Lifestyle', posts: 35 },
    { id: 3, name: 'Education', posts: 28 },
    { id: 4, name: 'Health', posts: 22 },
  ];

  const recentPosts = [
    {
      id: 1,
      title: 'How to Build a Full-Stack App',
      excerpt: 'A complete guide on building a modern full-stack application.',
      image: '/blog/fullstack.jpeg',
      date: 'Dec 10, 2024',
    },
    {
      id: 2,
      title: 'Understanding JavaScript Closures',
      excerpt: 'In-depth explanation of closures and how to use them effectively.',
      image: '/blog/js.jpeg',
      date: 'Dec 8, 2024',
    },
    {
        id: 3,
        title: 'Top 10 Tailwind CSS Tips',
        description: 'Enhance your workflow with these Tailwind CSS tips and tricks.',
        image: '/blog/tailwind.jpeg',
        link: '#',
      },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-gray-800 text-white min-h-screen">
          <div className="p-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <nav className="mt-8 space-y-4">
              <a href="#" className="block px-4 py-2 rounded-lg hover:bg-gray-700">
                Home
              </a>
              <a href="/dashboard/posts" className="block px-4 py-2 rounded-lg hover:bg-gray-700">
                Posts
              </a>
              <a href="/dashboard/categories" className="block px-4 py-2 rounded-lg hover:bg-gray-700">
                Categories
              </a>
              <a href="/dashboard/settings" className="block px-4 py-2 rounded-lg hover:bg-gray-700">
                Settings
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-gray-800">Recent Posts</h1>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Image src={post.image} alt={post.title} width={400} height={250} />
                <div className="p-4">
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  <p className="text-gray-600 mt-2">{post.excerpt}</p>
                  <p className="text-sm text-gray-500 mt-2">{post.date}</p>
                  <a href="#" className="block text-blue-500 hover:underline mt-4">Read More</a>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-12 text-3xl font-bold text-gray-800">Categories</h2>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(category => (
              <div key={category.id} className="bg-gray-100 rounded-lg p-4 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                <p className="text-gray-600 mt-2">Posts: {category.posts}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
