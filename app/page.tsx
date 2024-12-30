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
         <Link href="/blogs" className='px-6 py-3 m-1 bg-[#9f36e0] text-white-800 font-semibold rounded-lg  shadow hover:bg-transparent hover:text-yellow-400 transition duration-300'>Explore Blogs</Link>
          <Link href={"/about"} className='px-6 py-3 m-1 bg-[#d442af] text-white-800 font-semibold rounded-lg  shadow hover:bg-transparent hover:text-yellow-400 transition duration-300'>About Us</Link>
        
        </div>
      </section>

      {/* Recent Blogs Section */}
     <BlogList/>

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-gray-300">
  <h2 className="text-4xl font-bold text-center text-gray-600 mb-8">Explore Tech Categories</h2>
  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 px-8 md:px-20 lg:px-32">
    {[
      { name: 'Web Development', tags: ['React', 'JavaScript', 'HTML', 'Tailwind'] },
      { name: 'Data Science', tags: ['Python', 'Pandas', 'NumPy', 'Jupyter'] },
      { name: 'Machine Learning', tags: ['TensorFlow', 'Keras', 'Scikit-Learn', 'AI'] },
      { name: 'Cybersecurity', tags: ['Ethical Hacking', 'Pen Testing', 'Network Security'] },
      { name: 'Cloud Computing', tags: ['AWS', 'Azure', 'Google Cloud', 'Docker'] },
      { name: 'Blockchain', tags: ['Bitcoin', 'Ethereum', 'Solidity', 'Crypto'] },
      { name: 'Mobile Development', tags: ['React Native', 'Flutter', 'Swift', 'Kotlin'] },
      { name: 'DevOps', tags: ['CI/CD', 'Jenkins', 'Kubernetes', 'Docker'] },
    ].map((category, index) => (
      <div
        key={index}
        className="p-6 bg-white shadow-xl rounded-lg flex flex-col items-center justify-center font-semibold text-gray-800 hover:scale-105 transition-all duration-300 transform hover:shadow-2xl"
      >
        <span className="text-xl md:text-2xl mb-3">{category.name}</span>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {category.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-4 py-1 bg-gray-200 text-sm rounded-full text-gray-700 font-medium hover:bg-gray-300 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg shadow-md hover:bg-gradient-to-l transform transition duration-300 ease-in-out">
          Explore
        </button>
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
