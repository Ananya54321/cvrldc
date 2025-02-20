import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className=" sticky top-0 bg-white p-4 z-20">
      <div className="flex justify-between">
        <div>logo</div>
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/team">Team</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/verticals">Verticals</Link>
        </div>
        <Link href="/join-us">Join us</Link>
      </div>
    </div>
  );
};

export default Navbar;
