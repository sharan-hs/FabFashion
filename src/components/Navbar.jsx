import React, { useEffect, useState } from "react";

import { Link, NavLink, useLocation } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { toggleSearchView } from "../redux/productSlice";
import {
  CART_ICON_URL,
  DROPDOWN_ICON_URL,
  LOGO_URL,
  MENU_ICON_URL,
  PROFILE_ICON_URL,
  SEARCH_ICON_URL,
} from "../utils/constants";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [searchEnable, setSearchEnable] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const searchViewHandler = () => {
    dispatch(toggleSearchView());
  };

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setSearchEnable(true);
    } else {
      setSearchEnable(false);
    }
  }, [location]);
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link className="cursor-pointer" to="/">
        <img src={LOGO_URL} className="w-36" alt="Logo_Image" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        {searchEnable && (
          <img
            onClick={searchViewHandler}
            src={SEARCH_ICON_URL}
            className="w-5 cursor-pointer"
            alt="Search_Icon"
          />
        )}
        <Link to="/wishlist" className="relative">
          <FaRegHeart color="black" size={"22px"} />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {wishlist.length}
          </p>
        </Link>
        <div className="group relative">
          <img
            src={PROFILE_ICON_URL}
            alt="Profile_Icon"
            className="w-5 cursor-pointer"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-[-44px] pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <Link to={"/profile"}>
                <p className="cursor-pointer hover:text-black">My Profile</p>
              </Link>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <Link to={"/address"}>
                <p className="cursor-pointer hover:text-black">My Addresses</p>
              </Link>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={CART_ICON_URL} className="w-5 min-w-5" alt="Cart_Icon" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {cart.length}
          </p>
        </Link>
        <img
          alt="Menu_Icon"
          onClick={() => setVisible(true)}
          src={MENU_ICON_URL}
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>
      {/* SideBar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              src={DROPDOWN_ICON_URL}
              className="h-4 rotate-180"
              alt="Dropdown_Icon"
            />
            <p>Back</p>
          </div>

          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/wishlist"
          >
            WISHLIST
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
