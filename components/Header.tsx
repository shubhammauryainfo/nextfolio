"use client";
import Link from "next/link";
import { navigationLinks } from "@/lib/data";
import Image from "next/image";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi"; // Import icons for hamburger menu

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the mobile menu visibility
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="shadow sticky top-0 z-50 bg-gradient-to-r from-pink-500 to-purple-600">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/navlogo.png"
              alt="NEXTFOLIO Logo"
              width={200}
              height={60}
              className="max-w-full"
            />
          </Link>
        </div>

        {/* Hamburger Icon (Mobile Only) */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`lg:flex space-x-6 items-center ${
            isMenuOpen ? "block" : "hidden"
          } lg:block`}
        >
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center space-x-2 text-lg text-gray-700 hover:text-gray-300 transition"
            >
              <link.icon className="text-xl" />
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
