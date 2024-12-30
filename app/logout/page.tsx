"use client"; // Ensures client-side behavior

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Get all cookies
    const cookies = document.cookie.split(";");

    // Loop through all cookies and delete each one
    cookies.forEach(cookie => {
      const cookieName = cookie.split("=")[0].trim();
      // Remove the cookie by setting its expiration date to the past
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    // Clear sessionStorage or localStorage if used for session management
    sessionStorage.clear();
    localStorage.clear();

    // Redirect to the login page after logging out
    router.push("/login");
  }, [router]);

  return null; // No need to render anything, just perform the logout action
};

export default Logout;
