import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col">
      <h1 className="bold text-3xl">These are a few verticals you can join</h1>
      <Link href="/eclectics">Eclectics</Link>
      <Link href="/writers-space">Writer's Space</Link>
      <Link href="/stp">Story Telling and Public Speaking</Link>
      <Link href="/shared-shelf">Shared Shelf</Link>
    </div>
  );
};

export default page;
