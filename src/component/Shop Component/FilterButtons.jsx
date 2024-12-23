import React from "react";

const FilterButtons = ({ categories, onFilter }) => {
  return (
    <div className="filter-buttons">
      {categories.map((category) => (
        <button key={category} onClick={() => onFilter(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
