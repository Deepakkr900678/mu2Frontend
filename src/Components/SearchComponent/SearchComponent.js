import React from "react";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setKeyword } from "../../Slices/searchSlice";
import { setVisible } from "../../Slices/visibleSlice";
const SearchComponent = (props) => {
  const keyword = useSelector((state) => state.search.keyword);
  const [searchInput, setSearchInput] = useState(keyword || "");
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(setKeyword(searchInput));
    dispatch(setVisible(false));
    props.onSearch(searchInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      style={{
        textAlign: "end",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <input
        value={searchInput}
        type="search"
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="   Search here ..."
        style={{
          borderRadius: "20px",
          border: "2px solid #E31138",
        }}
      />
      <button style={{ border: "none" }} onClick={handleSearch}>
        <IoMdSearch style={{ height: "30px", width: "30px" }} />
      </button>
    </div>
  );
};

export default SearchComponent;
