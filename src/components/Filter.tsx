import React from "react";
import { FilterType } from "../types";

interface FilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const Filter: React.FC<FilterProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      {(["all", "completed", "pending"] as FilterType[]).map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-lg capitalize ${
            currentFilter === filter
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};
export default Filter;
