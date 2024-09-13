import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../utils/constants";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(`${BACKEND_URL}/products`);
    const data = await response.json();

    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "Idle",
    error: null,
    searchView: false,
    search: null,
  },
  reducers: {
    toggleSearchView: (state, action) => {
      state.searchView = !state.searchView;
    },
    searchProduct: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "Success";
      state.products = action.payload;
    });
  },
});

export const { toggleSearchView, searchProduct } = productSlice.actions;
export default productSlice.reducer;
