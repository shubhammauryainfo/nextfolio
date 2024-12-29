import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import BlogList from '@/components/BlogList';
export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
          <Image src="/logo.png" alt="Example Image" width={700} height={200}  />
          </h1>
         <Link href="#blogs" className='px-6 py-3 m-1 bg-[#9f36e0] text-white-800 font-semibold rounded-lg  shadow hover:bg-transparent hover:text-yellow-400 transition duration-300'>Explore Blogs</Link>
          <Link href={"/about"} className='px-6 py-3 m-1 bg-[#d442af] text-white-800 font-semibold rounded-lg  shadow hover:bg-transparent hover:text-yellow-400 transition duration-300'>About Us</Link>
        
        </div>
      </section>

      {/* Recent Blogs Section */}
     <BlogList/>

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
          <Link
            href="/login"
            className="px-6 py-3 bg-white text-purple-500 font-semibold rounded-lg shadow hover:bg-gray-200"
          >
            Start Writing
          </Link>
        </div>
      </section>
        

      {/* Footer */}
     <Footer/>
    </div>
  );
}
