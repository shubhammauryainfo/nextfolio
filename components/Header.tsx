import Link from "next/link";
import { navigationLinks } from "@/lib/data";
import Image from "next/image";
export default function Header() {
  return (
    <header className="shadow sticky top-0 z-50 bg-gradient-to-r from-pink-500 to-purple-600">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <div>
          <Link href="/">
          <Image src="/navlogo.png" alt="NEXTFOLIO Logo" width={200} height={60} />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6">
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
