import React, { useEffect } from "react";
import Title from "../components/Title";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Orders = () => {
  const { order } = useSelector((store) => store.cart);

  useEffect(() => {
    toast.success("Order Placed Successfully!");
  }, []);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {order?.map((item) => (
          <div
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            key={item.productData?._id}
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                src={item?.productData?.image[0]}
                alt="Thumbnail_Image"
                className="w-16 sm:w-20"
              />
              <div>
                <p className="sm:text-base font-medium">
                  {item?.productData?.name}
                </p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p>{item?.productData?.price}</p>
                  <p>Quantity: {item?.quantity}</p>
                  <p>Size: {item?.size}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
