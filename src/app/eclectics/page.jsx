import React from "react";
import FilteredEvents from "@/components/pages/events/FilteredEvents";
import EditEvents from "@/components/pages/events/EditEvents";
const page = () => {
  const vertical = "eclectics";
  return (
    <div>
      Eclectics Vertical
      <FilteredEvents vertical={vertical} />
      <EditEvents vertical={vertical} />
    </div>
  );
};

export default page;
