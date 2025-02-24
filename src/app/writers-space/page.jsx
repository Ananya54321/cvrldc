import React from "react";
import FilteredEvents from "@/components/pages/events/FilteredEvents";
import EditEvents from "@/components/pages/events/EditEvents";

const page = () => {
  const vertical = "writers-space";
  return (
    <div>
      Writer's space Vertical
      <FilteredEvents vertical={vertical} />
      <EditEvents vertical={vertical} />
    </div>
  );
};

export default page;
