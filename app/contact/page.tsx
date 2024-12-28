"use client";
import Link from "next/link";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { IoCallOutline , IoMailOpenOutline , IoLocationOutline } from "react-icons/io5";
interface FormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    setIsSending(true);

    try {
      const response = await fetch("/api/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey || "",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "Your feedback has been submitted successfully.",
        });
        setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to submit feedback");
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="bg-gray-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 grid-cols-1">
            {/* Contact Information */}
            <div className="lg:mb-0 mb-10">
              <div className="group w-full h-full">
                <div className="relative h-full">
                  <Image
                    src="https://pagedone.io/asset/uploads/1696488602.png"
                    alt="ContactUs section"
                    className="w-full h-full lg:rounded-l-2xl rounded-2xl object-cover"
                    width={500}
                    height={300}
                  />
                  <h1 className="font-manrope text-white text-4xl font-bold absolute top-11 left-11">
                    Contact us
                  </h1>
                  <div className="absolute bottom-0 w-full lg:p-11 p-5">
                            <div className="bg-white rounded-lg p-6 block">
                                <Link href="javascript:;" className="flex items-center mb-6">
                                   <IoCallOutline
                                   className="text-3xl text-blue-500"/>
                                    <h5 className="text-black text-base font-normal leading-6 ml-5">470-601-1911</h5>
                                </Link>
                                <Link href="javascript:;" className="flex items-center mb-6">
                                <IoMailOpenOutline 
                                className="text-3xl text-blue-500" />
                                    <h5 className="text-black text-base font-normal leading-6 ml-5">Pagedone1234@gmail.com</h5>
                                </Link>
                                <Link href="javascript:;" className="flex items-center">
                               < IoLocationOutline
                                className="text-3xl text-blue-500" />
                                    <h5 className="text-black text-base font-normal leading-6 ml-5">654 Sycamore Avenue, Meadowville, WA 76543</h5>
                                </Link>
                            </div>
                        </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
              <h2 className="text-indigo-600 font-manrope text-4xl font-semibold mb-11">
                Send Us A Message
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg rounded-full border border-gray-200 pl-4 mb-10"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg rounded-full border border-gray-200 pl-4 mb-10"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg rounded-full border border-gray-200 pl-4 mb-10"
                />
                 <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg rounded-full border border-gray-200 pl-4 mb-10"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className="w-full h-24 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg rounded-lg border border-gray-200 pl-4 mb-10"
                ></textarea>
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full h-12 text-white text-base font-semibold rounded-full bg-indigo-600 hover:bg-indigo-800 transition-all duration-700"
                >
                  {isSending ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
