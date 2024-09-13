import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, fetchAddress, updateAddress } from "../redux/cartSlice";

const ManageAddress = () => {
  const { address } = useSelector((state) => state.cart);
  const [isAddressUpdated, setIsAddressUpdated] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [editView, setEditView] = useState(false);
  const [addressData, setAddressData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAddress());
    setIsAddressUpdated(false);
  }, [isAddressUpdated]);

  const deleteHandler = (address) => {
    dispatch(deleteAddress(address._id));
    setIsAddressUpdated(true);
  };
  const editHandler = (address) => {
    setEditView(true);
    setAddressData(address);
    setSelectedAddressId(address._id);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const formHandler = (e) => {
    e.preventDefault();

    dispatch(updateAddress({ selectedAddressId, addressData }));
    setIsAddressUpdated(true);
    setEditView(false);
  };

  return (
    <div>
      {!editView &&
        address?.map((item) => (
          <div
            key={item._id}
            className="flex border-gray-300 hover:border-orange-500 border-2 mt-4 justify-between"
          >
            <div className=" max-w-[480px] px-4 py-3  cursor-pointer rounded-lg">
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
            <button
              onClick={() => editHandler(item)}
              className=" text-black px-16 py-2 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => deleteHandler(item)}
              className=" text-black px-16 py-3 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      {editView && (
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

          <button className="bg-black mt-4 text-white px-16 py-3 text-sm">
            Save Address
          </button>
        </form>
      )}
    </div>
  );
};

export default ManageAddress;
