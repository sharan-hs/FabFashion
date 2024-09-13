import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../utils/constants";

export const addAddress = createAsyncThunk(
  "/profile/address",
  async (address) => {
    const response = await fetch(`${BACKEND_URL}/profile/newAddress`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(address),
    });
    if (!response.ok) {
      console.log("Error occurred while adding Address");
    } else {
      console.log("Address added successfully");
    }
  }
);

export const fetchAddress = createAsyncThunk("/address", async () => {
  const response = await fetch(`${BACKEND_URL}/profile/address`);
  const data = await response.json();
  return data;
});

export const updateAddress = createAsyncThunk(
  "/address/update",
  async ({ selectedAddressId, ...updatedAddress }) => {
    const updatedObj = updatedAddress.addressData;

    const response = await fetch(
      `${BACKEND_URL}/address/${selectedAddressId}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedObj),
      }
    );
    const data = await response.json();

    return data;
  }
);

export const deleteAddress = createAsyncThunk("/address/delete", async (id) => {
  const response = await fetch(`${BACKEND_URL}/profile/address/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    console.log("Error occurred while deleting Address");
  } else {
    console.log("Address deleted successfully");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
    address: [],
    order: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { productData, size } = action.payload;
      if (!size) {
        toast.error("Select Product Size");
        return;
      }

      const itemIndex = state.cart.findIndex(
        (item) => item.productData._id === productData._id && item.size === size
      );

      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { productData, size } = action.payload;

      const itemIndex = state.cart.findIndex(
        (item) => item.productData._id === productData._id && item.size === size
      );

      state.cart.splice(itemIndex, 1);
    },
    getOrder: (state, action) => {
      state.order = [...state.cart];
    },
    incrementQuantity: (state, action) => {
      const { productData, size } = action.payload;

      const itemIndex = state.cart.findIndex(
        (item) => item.productData._id === productData._id && item.size === size
      );

      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { productData, size } = action.payload;

      const itemIndex = state.cart.findIndex(
        (item) => item.productData._id === productData._id && item.size === size
      );

      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity -= 1;
        if (state.cart[itemIndex].quantity === 0) {
          state.cart.splice(itemIndex, 1);
        }
      }
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addAddress.fulfilled, (state, action) => {
      state.status = "Success";
      state.address = action.payload;
    });

    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.status = "Success";
      state.address = action.payload;
    });
    builder.addCase(updateAddress.fulfilled, (state, action) => {
      state.status = "success";
      const updatedAddress = action.payload;

      state.address = state.address.map((address) =>
        address._id === updatedAddress._id ? updatedAddress : address
      );
    });

    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.status = "Success";
      state.address = state.address.filter((add) => add._id !== action.payload);
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  getOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
