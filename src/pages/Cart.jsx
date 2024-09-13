import React from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { DELETE_ICON_URL } from "../utils/constants";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((store) => store.cart);

  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const incrementItem = (item) => {
    const { productData, size } = item;
    dispatch(incrementQuantity({ productData, size }));
  };

  const decrementItem = (item) => {
    const { productData, size } = item;
    dispatch(decrementQuantity({ productData, size }));
  };
  return cart?.length === 0 ? (
    <div className="flex items-center justify-center h-[40vh]">
      <p>
        Your Cart is
        <span className="text-gray-900 text-2xl font-medium"> Empty!</span>
      </p>
    </div>
  ) : (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
        <div>
          {cart?.map((item, index) => {
            return (
              <div
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_3fr_0.5fr] items-center gap-4"
                key={index}
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    alt="Thumbnail_Image"
                    src={item?.productData.image[0]}
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {item.productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p className="font-light text-lg">
                        {"$"} {item.productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span
                    onClick={() => decrementItem(item)}
                    className="bg-gray-700 text-white cursor-pointer px-3 py-1"
                  >
                    -
                  </span>
                  <button className="w-10 px-2 text-lg sm:px-3 sm:py-1 border bg-slate-50">
                    {item.quantity}
                  </button>
                  <span
                    onClick={() => incrementItem(item)}
                    className="bg-gray-700 text-white cursor-pointer px-3 py-1"
                  >
                    +
                  </span>
                </div>
                <img
                  onClick={() => deleteItem(item)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={DELETE_ICON_URL}
                  alt="Delete_Icon"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
