import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishList } from "../redux/wishlistSlice";
import { STAR_ICON_URL } from "../utils/constants";

const ProductItem = ({ id, image, name, price, rating }) => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast.success("Added to Wishlist!");
    } else {
      toast.success("Removed from Wishlist!");
    }
  };

  useEffect(() => {
    const productData = products.find((item) => item?._id === id);

    const size = productData?.sizes[0];
    if (isLiked) {
      dispatch(addToWishlist({ productData, size }));
    } else {
      dispatch(removeFromWishList({ productData, size }));
    }
  }, [isLiked]);

  return (
    <div className="relative shadow-md rounded-sm overflow-hidden">
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image[0]}
          alt="Thumbnail_Image"
        />
      </div>
      <Link className="text-gray-700  cursor-pointer" to={`/product/${id}`}>
        <p className="pt-3 pl-2 pb-1 text-sm">{name}</p>
        <div className="flex items-center justify-between">
          <p className="text-sm pl-2 font-medium">
            {"$"} {price}
          </p>
          <div className="flex w-10 h-10 items-center gap-1">
            <p>{rating}</p>
            <img className="w-4 h-4" src={STAR_ICON_URL} />
          </div>
        </div>
      </Link>
      <span
        onClick={handleLike}
        className="absolute cursor-pointer right-2 top-2"
      >
        <FaHeart
          size={"20px"}
          fill={isLiked ? "red" : "gray"}
          color={isLiked ? "white" : "black"}
        />
      </span>
    </div>
  );
};

export default ProductItem;
