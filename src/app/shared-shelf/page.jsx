import React from "react";
import FilteredEvents from "@/components/pages/events/FilteredEvents";
import EditEvents from "@/components/pages/events/EditEvents";

const page = () => {
  const vertical = "shared-shelf";
  return (
    <div>
      Shared Shelf Vertical
      <FilteredEvents vertical={vertical} />
      <EditEvents vertical={vertical} />
    </div>
  );
};

export default page;
