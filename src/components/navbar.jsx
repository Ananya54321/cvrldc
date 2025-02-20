import React from "react";
import Link from "next/link";
import logo from "@/../public/cvrldclogo.svg";
import Image from "next/image";
const Navbar = () => {
  return (
    <div className=" sticky top-0 bg-white text-lg p-4 z-20">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image src={logo} alt="logo" width={50} height={50} rounded-full />
          <p className="font-bold">CVR LDC</p>
        </div>
        <div className="flex items-center  justify-center gap-4">
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
