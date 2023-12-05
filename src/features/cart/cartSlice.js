import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exitingProduct = state.cart.find(
        (product) => product._id === action.payload._id
      );

      if (!exitingProduct) {
        const product = { ...action.payload, quantity: 1 };
        state.cart.push(product);
      } else {
        const product = {
          ...exitingProduct,
          quantity: exitingProduct.quantity + 1,
        };
        state.cart = state.cart.filter(
          (product) => product._id !== exitingProduct._id
        );
        state.cart.push(product);
      }
    },
    removeFormCart: (state, action) => {
      if (action.payload.quantity > 1) {
        const product = {
          ...action.payload,
          quantity: action.payload.quantity - 1,
        };
        state.cart = state.cart.filter(
          (product) => product._id !== action.payload._id
        );
        state.cart.push(product);
      } else {
        state.cart = state.cart.filter(
          (product) => product._id !== action.payload._id
        );
      }
    },
  },
});

export const { addToCart, removeFormCart } = cartSlice.actions;

export default cartSlice.reducer;
