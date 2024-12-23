import React from "react";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-container">
      <i className="fas fa-search"></i>
      <input type="text" placeholder="Search Item" className="search"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
