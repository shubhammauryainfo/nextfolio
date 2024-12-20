import Link from "next/link";
import { navigationLinks } from "@/lib/data";

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-purple-600">
          <Link href="/">NEXTFOLIO</Link>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition"
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
