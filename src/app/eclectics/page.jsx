import React from "react";
import FilteredEvents from "@/components/pages/events/FilteredEvents";
import Link from "next/link";
import EditEvents from "@/components/pages/events/EditEvents";
import CreateQuiz from "@/components/pages/eclectics/CreateQuiz";
const page = () => {
  const vertical = "eclectics";
  return (
    <div>
      Eclectics Vertical
      <FilteredEvents vertical={vertical} />
      {/* <EditEvents vertical={vertical} /> */}
      <Link href="/eclectics/create-quiz">
        <button>Create a Quiz</button>
      </Link>
    </div>
  );
};

export default page;
