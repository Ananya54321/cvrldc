"use client";
import React, { useState } from "react";
import Link from "next/link";
import logo from "@/../public/cvrldclogo.svg";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-white text-lg p-4 z-20 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <Image
            src={logo}
            alt="logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <p className="font-bold">CVR LDC</p>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/team">Team</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/verticals">Verticals</Link>
          <Link
            href="/join-us"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
            Join us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md py-4 flex flex-col items-center space-y-4">
          <Link href="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/team" onClick={() => setIsOpen(false)}>
            Team
          </Link>
          <Link href="/gallery" onClick={() => setIsOpen(false)}>
            Gallery
          </Link>
          <Link href="/blog" onClick={() => setIsOpen(false)}>
            Blog
          </Link>
          <Link href="/verticals" onClick={() => setIsOpen(false)}>
            Verticals
          </Link>
          <Link
            href="/join-us"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
            onClick={() => setIsOpen(false)}>
            Join us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
