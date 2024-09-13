import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import { addToCart } from "../redux/cartSlice";
import { removeFromWishList } from "../redux/wishlistSlice";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();

  const cartHandler = (item) => {
    const { productData, size } = item;
    dispatch(addToCart({ productData, size }));

    toast.success("Added to Cart!");
  };

  const removeItemHandler = (item) => {
    const { productData, size } = item;

    dispatch(removeFromWishList({ productData, size }));

    toast.success("Removed from Wishlist!");
  };
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"WISHLIST"} />
      </div>
      <div>
        {wishlist?.map((item) => (
          <div
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            key={item?.productData?._id}
          >
            <div className="flex items-start gap-6 justify-between w-full text-sm">
              <div className="flex items-start gap-6">
                <img
                  src={item?.productData?.image[0]}
                  alt="Thumbnail_Image"
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="sm:text-base font-medium">
                    {item?.productData?.name}{" "}
                    <span className="ml-4 font-bold bg-gray-600 text-white px-2">
                      {item?.size}
                    </span>
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p>{item?.productData?.price}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <button onClick={() => cartHandler(item)}>Add to Cart</button>
                <button onClick={() => removeItemHandler(item)}>
                  Remove from Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
