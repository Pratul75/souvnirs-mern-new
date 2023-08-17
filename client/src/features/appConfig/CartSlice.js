import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  count: 0,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products = [
        state.products,
        {
          productId: action.payload.productId,
          quantity: action.payload.quantity,
        },
      ];
    },
    increaseCount: (state, action) => {
      state.state.count = action.payload.count;
    },
    removeProduct: (state, action) => {
      Object.assign(state, initialState);
    },
  },
});

export const { addProduct } = wishlistSlice.actions;
// Action creators are generated for each case reducer function

export default wishlistSlice.reducer;
