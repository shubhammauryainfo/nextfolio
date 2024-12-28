'use client'
import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-6 shadow-md">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
