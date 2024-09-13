import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useLocation } from "react-router-dom";
import { searchProduct, toggleSearchView } from "../redux/productSlice";
import { CROSS_ICON_URL, SEARCH_ICON_URL } from "../utils/constants";

const SearchBar = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const searchView = useSelector((state) => state.products.searchView);

  const [search, setSearch] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  const closeHandler = () => {
    dispatch(toggleSearchView());
    dispatch(searchProduct(""));
    setSearch("");
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };
  return searchView && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 mx-3 my-5 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          value={search}
          onChange={searchHandler}
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <img src={SEARCH_ICON_URL} alt="Search_Icon" className="w-4" />
      </div>
      <img
        onClick={closeHandler}
        src={CROSS_ICON_URL}
        alt="Close_Icon"
        className="inline w-3 cursor-pointer"
      />
    </div>
  ) : null;
};
export default SearchBar;
