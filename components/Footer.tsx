import Link from 'next/link';
const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-4 text-center md:py-6">
        <p>&copy; {new Date().getFullYear()} NEXTFOLIO . All rights reserved. Developed by <Link href="http://nexbytes.rf.gd" target="_blank" className='text-purple-400 hover:text-purple-500' rel="noopener noreferrer">Nexbytes</Link>.</p>
      </footer>
    );
  };
  
  export default Footer;