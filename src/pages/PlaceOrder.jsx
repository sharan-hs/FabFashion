import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { clearCart, fetchAddress, getOrder } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(true);
  const { address } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAddress());
  }, []);

  const deliveryHandler = (item) => {
    setDeliveryAddress(item);
    setShowAddress(false);
  };

  const orderHandler = () => {
    if (deliveryAddress.length < 1) {
      toast.error("Select a delivery address");
    } else {
      dispatch(getOrder());
      dispatch(clearCart());
      navigate("/orders");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Existing Address */}

      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"SELECT"} text2={"ADDRESS"} />
        </div>
        <>
          {showAddress &&
            address?.map((item) => (
              <div
                key={item._id}
                onClick={() => deliveryHandler(item)}
                className="border-2 border-gray-300 px-4 py-3 hover:border-orange-500 cursor-pointer rounded-lg"
              >
                <div className="flex my-1 gap-2">
                  <p className="font-bold">First Name: </p>
                  <p className="font-light">{item?.fname}</p>
                </div>
                <div className="flex my-1 gap-2">
                  <p className="font-bold">Last Name: </p>
                  <p className="font-light">{item?.lname}</p>
                </div>
                <div className="flex my-1 gap-2">
                  <p className="font-bold">Email Address: </p>
                  <p className="font-light">{item?.email}</p>
                </div>
                <div className="flex my-1 gap-2">
                  <p className="font-bold">Street Name: </p>
                  <p className="font-light">{item?.street}</p>
                </div>
                <div className="flex my-1 gap-2">
                  <p className="font-bold">City: </p>
                  <p className="font-light">{item?.city}</p>
                </div>
                <div className="flex my-1 gap-2">
                  <p className="font-bold">State: </p>
                  <p className="font-light">{item?.state}</p>
                </div>
                <div className="flex my-1 gap-2">
                  <p className="font-bold">Country: </p>
                  <p className="font-light">{item?.country}</p>
                </div>
                <div className="flex my-1 gap-2">
                  <p className="font-bold">Pincode: </p>
                  <p className="font-light">{item?.pincode}</p>
                </div>
                <div className="flex my-1 gap-2">
                  <p className="font-bold">Phone Number: </p>
                  <p className="font-light">{item?.phone}</p>
                </div>
              </div>
            ))}
          {showAddress && (
            <button
              onClick={() => navigate("/address")}
              // onClick={() => setNewAddress(true)}
              className="bg-black w-full sm:w-1/2 text-white text-sm my-8 px-8 py-2"
            >
              ADD NEW ADDRESS
            </button>
          )}
        </>
        {/* Left side */}

        {!showAddress && (
          <div className="border-2 border-gray-300 px-4 py-3 hover:border-orange-500 cursor-pointer rounded-lg">
            <div className="flex my-1 gap-2">
              <p className="font-bold">First Name: </p>
              <p className="font-light">{deliveryAddress?.fname}</p>
            </div>
            <div className="flex my-1 gap-2">
              <p className="font-bold">Last Name: </p>
              <p className="font-light">{deliveryAddress?.lname}</p>
            </div>
            <div className="flex my-1 gap-2">
              <p className="font-bold">Email Address: </p>
              <p className="font-light">{deliveryAddress?.email}</p>
            </div>
            <div className="flex my-1 gap-2">
              <p className="font-bold">Street Name: </p>
              <p className="font-light">{deliveryAddress?.street}</p>
            </div>
            <div className="flex my-1 gap-2">
              <p className="font-bold">City: </p>
              <p className="font-light">{deliveryAddress?.city}</p>
            </div>
            <div className="flex my-1 gap-2">
              <p className="font-bold">State: </p>
              <p className="font-light">{deliveryAddress?.state}</p>
            </div>
            <div className="flex my-1 gap-2">
              <p className="font-bold">Country: </p>
              <p className="font-light">{deliveryAddress?.country}</p>
            </div>
            <div className="flex my-1 gap-2">
              <p className="font-bold">Pincode: </p>
              <p className="font-light">{deliveryAddress?.pincode}</p>
            </div>
            <div className="flex my-1 gap-2">
              <p className="font-bold">Phone Number: </p>
              <p className="font-light">{deliveryAddress?.phone}</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Side */}

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="w-full text-end mt-8">
          <button
            onClick={orderHandler}
            className="bg-black text-white px-16 py-3 text-sm"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
