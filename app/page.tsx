import Image from 'next/image';

export default function Home() {
  const blogs = [
    {
      id: 1,
      title: 'How to Build a Full-Stack App',
      description: 'Step-by-step guide to building a modern full-stack web application.',
      image: '/blog/fullstack.jpeg',
      link: '#',
    },
    {
      id: 2,
      title: 'Understanding JavaScript Closures',
      description: 'Deep dive into closures and their practical uses in JavaScript.',
      image: '/blog/js.jpeg',
      link: '#',
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
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-600">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to <span className="text-yellow-400">Nextfolio</span></h1>
          <p className="text-xl mb-6">Your one-stop platform for insightful articles and stories.</p>
          <a
            href="#blogs"
            className="px-6 py-3 bg-yellow-400 text-gray-800 font-semibold rounded-lg shadow hover:bg-yellow-300"
          >
            Explore Blogs
          </a>
        </div>
      </section>

      {/* Recent Blogs Section */}
      <section id="blogs" className="py-16 px-8 md:px-20 lg:px-32">
        <h2 className="text-4xl font-bold text-center mb-8">Recent Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="p-6 bg-white shadow rounded-lg hover:shadow-xl transition duration-300"
            >
              <Image
                src={blog.image}
                alt={blog.title}
                width={400}
                height={200}
                className="rounded mb-4 object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <h3 className="text-2xl font-semibold mb-4">{blog.title}</h3>
              <p className="text-gray-600 mb-4">{blog.description}</p>
              <a
                href={blog.link}
                className="text-blue-500 hover:underline"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-8">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 md:px-20 lg:px-32">
          {[...Array(8).keys()].map((index) => (
            <div
              key={index}
              className={`p-4 bg-gray-${200 + index} shadow-lg rounded-lg flex flex-col items-center justify-center font-semibold text-gray-800 hover:scale-105 transition-transform duration-300`}
            >
              <span className="md:text-xl text-md mb-2">Category {index + 1}</span>
              <button className="px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-100">Explore</button>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-purple-500 text-white text-center p-2">
        <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
        <p className="text-lg mb-6">Subscribe to our newsletter or start writing your own blogs today!</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#subscribe"
            className="px-6 py-3 bg-yellow-400 text-gray-800 font-semibold rounded-lg shadow hover:bg-yellow-300"
          >
            Subscribe
          </a>
          <a
            href="#write"
            className="px-6 py-3 bg-white text-purple-500 font-semibold rounded-lg shadow hover:bg-gray-200"
          >
            Start Writing
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-gray-900 text-center text-white">
        <p>&copy; 2024 Nextfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}
