import React, { useState } from "react";
import Title from "./Title";
import { addAddress } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addressData, setAddressData] = useState({
    fname: "",
    lname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: null,
    country: "",
    phone: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const formHandler = (e) => {
    e.preventDefault();

    dispatch(addAddress(addressData));
  };

  return (
    <div>
      <div className="flex flex-col gap-4 w-full ">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"ADDRESS"} text2={"MANAGEMENT"} />
        </div>

        <div className="flex flex-col sm:flex-row items-start justify-between w-full">
          <form onSubmit={formHandler}>
            <div className="flex gap-3 my-4">
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                name="fname"
                onChange={handleInputChange}
                required
                value={addressData.fname || ""}
                placeholder="First name"
              />
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                name="lname"
                onChange={handleInputChange}
                required
                value={addressData.lname || ""}
                placeholder="Last name"
              />
            </div>
            <input
              className="border mb-2 border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="email"
              name="email"
              onChange={handleInputChange}
              required
              value={addressData.email || ""}
              placeholder="Email address"
            />
            <input
              className="border my-2 border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              name="street"
              onChange={handleInputChange}
              required
              value={addressData.street || ""}
              placeholder="Street"
            />
            <div className="flex gap-3 my-2">
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                name="city"
                onChange={handleInputChange}
                required
                value={addressData.city || ""}
                placeholder="City"
              />
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                name="state"
                onChange={handleInputChange}
                required
                value={addressData.state || ""}
                placeholder="State"
              />
            </div>

            <div className="flex gap-3 my-4">
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="number"
                name="pincode"
                onChange={handleInputChange}
                required
                value={addressData.pincode || ""}
                placeholder="Pincode"
              />
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                name="country"
                onChange={handleInputChange}
                required
                value={addressData.country || ""}
                placeholder="Country"
              />
            </div>
            <input
              className="border mb-2 border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="number"
              name="phone"
              onChange={handleInputChange}
              required
              value={addressData.phone || ""}
              placeholder="Phone"
            />

            <button className="bg-black my-4 text-white px-16 py-3 text-sm">
              Add Address
            </button>
          </form>

          <button
            onClick={() => navigate("/addressManagement")}
            className="bg-black text-white py-3 px-8  sm:px-12 sm:py-3 w-[40vw] sm:w-[20vw] text-sm"
          >
            Manage Existing Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
