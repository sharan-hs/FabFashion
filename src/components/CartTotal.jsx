import React from "react";
import Title from "./Title";
import { useSelector } from "react-redux";

const CartTotal = () => {
  const { cart } = useSelector((store) => store.cart);

  const subTotal = cart.reduce(
    (acc, curr) => acc + curr.productData.price * curr.quantity,
    0
  );

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>$ {subTotal}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{subTotal > 500 ? "Free" : "$50"}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Total</p>
          <p>${subTotal < 500 ? subTotal + 50 : subTotal} </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
