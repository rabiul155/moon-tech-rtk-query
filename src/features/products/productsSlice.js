import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, postProduct } from "./productsAPI";

const initialState = {
  products: [],
  isLoading: false,
  postSuccess: false,
  isError: false,
  error: "",
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const products = fetchProducts();
    return products;
  }
);
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data) => {
    const products = postProduct(data);
    return products;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
        state.isError = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isError = action.error.message;
        state.products = [];
        state.isLoading = false;
      })
      .addCase(addProduct.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.postSuccess = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.postSuccess = true;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isError = action.error.message;
        state.postSuccess = false;
        state.isLoading = false;
      });
  },
});

export default productsSlice.reducer;
