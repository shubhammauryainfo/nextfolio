import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BiSupport } from "react-icons/bi";
import { VscTools } from "react-icons/vsc";
import { FaPeopleGroup } from "react-icons/fa6";



export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
          <Header />
      {/* About Us Section */}
      <section className="py-16 px-8 md:px-20 lg:px-32">
        <h1 className="text-4xl font-bold text-center mb-8">About NEXTFOLIO</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <p className="text-lg leading-relaxed mb-4">
              Welcome to <strong>NEXTFOLIO</strong>, your ultimate tech blogging and portfolio platform. Our mission is to empower developers, tech enthusiasts, and professionals to showcase their skills, share insights, and connect with a global community.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              At <strong>NEXTFOLIO</strong>, we believe in the power of collaboration and knowledge-sharing. Whether you're exploring the latest tech trends, creating stunning portfolios, or diving deep into coding tutorials, our platform is designed to inspire and support you every step of the way.
            </p>
            <p className="text-lg leading-relaxed">
              Join us as we build a vibrant ecosystem where innovation meets creativity. Together, we can shape the future of technology, one project at a time.
            </p>
          </div>

          {/* Image Content */}
          <div>
            <Image
              src="/team.webp" // Replace with your actual image path
              alt="About NEXTFOLIO"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-8 md:px-20 lg:px-32 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose NEXTFOLIO?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow rounded-lg text-center">
            <FaPeopleGroup
            className="w-8 h-8 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Thriving Community</h3>
            <p className="text-gray-600">
              Connect with tech enthusiasts and professionals from all over the world.
            </p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg text-center">
            <VscTools
            className="w-8 h-8 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Innovative Tools</h3>
            <p className="text-gray-600">
              Create, share, and manage your portfolio with our user-friendly tools.
            </p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg text-center">
            <BiSupport
            className="w-8 h-8 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
            <p className="text-gray-600">
              Get guidance and support from experienced professionals anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-purple-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Join the NEXTFOLIO Community</h2>
        <p className="text-lg mb-6">
          Start your journey today. Explore blogs, share your projects, or connect with like-minded innovators.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/blogs"
            className="px-6 py-3 bg-yellow-400 text-gray-800 font-semibold rounded-lg shadow hover:bg-yellow-300"
          >
            Explore Blogs
          </a>
          <a
            href="/contact"
            className="px-6 py-3 bg-white text-purple-500 font-semibold rounded-lg shadow hover:bg-gray-200"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
