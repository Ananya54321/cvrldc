import React from "react";
import FilteredEvents from "@/components/pages/events/FilteredEvents";
import EditEvents from "@/components/pages/events/EditEvents";

const page = () => {
  const vertical = "stp";
  return (
    <div>
      STP Vertical
      <FilteredEvents vertical={vertical} />
      <EditEvents vertical={vertical} />

    </div>
  );
};

export default page;
