"use client"; // Ensures client-side behavior

import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Define the shape of the formData state
interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const router = useRouter(); // For redirection

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if fields are empty
    if (!formData.email || !formData.password) {
      Swal.fire({
        title: "Missing Fields",
        text: "Please fill in all required fields.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return; // Stop submission if fields are empty
    }

    // Show loading alert
    Swal.fire({
      title: "Logging in...",
      text: "Please wait while we verify your credentials.",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await fetch("/api/login", { // Backend login endpoint (App Router API)
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "", // API key for backend authentication
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();

        // Store the token in sessionStorage
        sessionStorage.setItem("token", data.token);

        // Store the user data in sessionStorage as well if needed
        sessionStorage.setItem("user", JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
        }));

        // Show success alert
        Swal.fire({
          title: "Success!",
          text: "You have logged in successfully. Redirecting...",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        const error = await res.json();

        // Show error alert for invalid credentials
        Swal.fire({
          title: "Invalid Login",
          text:
            error.error ||
            "Incorrect email or password. Please try again or sign up if you don’t have an account.",
          icon: "error",
          confirmButtonText: "Sign Up",
          showCancelButton: true,
          cancelButtonText: "Try Again",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/signup");
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);

      // Show error alert for unexpected issues
      Swal.fire({
        title: "Error",
        text: "Could not connect to the server. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg m-2">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500">Login to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white shadow-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white shadow-sm"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
