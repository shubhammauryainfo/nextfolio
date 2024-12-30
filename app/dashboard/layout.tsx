// app/dashboard/layout.tsx

"use client";  // Mark this file as a client-side component

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Metadata } from "next";



export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  useEffect(() => {
    // Check if both token and user are present in sessionStorage
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");

    // If either token or user is missing, redirect to login page
    if (!token || !user) {
      console.log("No token or user found. Redirecting to login...");
      router.push("/login");
    }
  }, [router]);

  return (
    <html lang="en">
      <body>
        {children} {/* Render the child pages */}
      </body>
    </html>
  );
}
