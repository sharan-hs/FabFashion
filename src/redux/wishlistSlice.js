import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const { productData, size } = action.payload;
      if (!size) {
        toast.error("Select Product Size");
        return;
      }

      const itemIndex = state.wishlist.findIndex(
        (item) => item.productData._id === productData._id && item.size === size
      );

      if (itemIndex >= 0) {
        state.wishlist[itemIndex].quantity += 1;
      } else {
        state.wishlist.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromWishList: (state, action) => {
      const { productData, size } = action.payload;

      const itemIndex = state.wishlist.findIndex(
        (item) => item.productData._id === productData._id && item.size === size
      );

      state.wishlist.splice(itemIndex, 1);
    },
    clearWishList: (state) => {
      state.wishlist = [];
    },
  },
});

export const { addToWishlist, removeFromWishList, clearWishList } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
