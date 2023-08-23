import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productIds: [],
  count: 0,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.productIds = [...state.productIds, action.payload.id];
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
