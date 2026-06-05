"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl flex items-center gap-2">
            🧭 College Compass
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/" className="hover:text-blue-100 transition">
              Home
            </Link>
            <Link href="/favorites" className="hover:text-blue-100 transition">
              ❤️ Favorites
            </Link>
            <Link href="/compare" className="hover:text-blue-100 transition">
              Compare
            </Link>
            <Link
              href="/admin"
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block hover:text-blue-100 py-2">
              Home
            </Link>
            <Link href="/favorites" className="block hover:text-blue-100 py-2">
              ❤️ Favorites
            </Link>
            <Link href="/compare" className="block hover:text-blue-100 py-2">
              Compare
            </Link>
            <Link href="/admin" className="block hover:text-blue-100 py-2">
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
