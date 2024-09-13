import React, { useEffect } from "react";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../redux/cartSlice";

const Profile = () => {
  const { address } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"PROFILE"} text2={"DETAILS"} />
      </div>
      <div className="min-w-1/2 p-4">
        <p className="text-xl py-4">Name: Sharan H S</p>
        <hr />
        <p className="text-xl py-4">Email: sharan@gmail.com</p>
        <hr />
        <p className="text-xl py-4">Phone: +91- 897321233</p>
        <hr />
        <p className="text-xl py-4">
          Address:
          <span>
            {address[0]?.street}, {address[0]?.city}, {address[0]?.pincode} ,
            {address[0]?.state}, {address[0]?.country}
          </span>
        </p>
        <p className="text-xl pl-20"></p>
      </div>
    </div>
  );
};

export default Profile;
