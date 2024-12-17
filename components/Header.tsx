import { dashboardNav } from "@/lib/data";
import Link from "next/link";
import { MdLogout } from "react-icons/md";
export default function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo or Brand */}
        <Link href="/">
          <h1 className="text-2xl font-bold">NEXTFOLIO</h1>
        </Link>
         

        {/* Navigation Menu */}
        <nav>
          <ul className="flex space-x-6">
            {dashboardNav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.path}
                  className="flex items-center hover:text-gray-400 transition-colors"
                >
                  {/* Render Icon */}
                  <span className="mr-1 text-lg">
                    <item.icon />
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
               <li>
                <a
                  href="/logout"
                  className="flex items-center hover:text-gray-400 transition-colors bg-red-600 hover:bg-red-500 px-1 rounded">
                
                  <span className="mr-1 text-lg">
                    <MdLogout />
                  </span>
                  <span>Logout</span>
                </a>
              </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
