import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  vendorId: "",
  categoryId: "",
  desc: "",
  tags: [],
  status: "",
  sku: "",
  attributes: [],
  variants: [],
  coverImg: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      console.log(action.payload);
      const {
        name,
        description,
        vendorId,
        categoryId,
        tags,
        sku,
        status,
        attributes,
        img,
      } = action.payload;
      if (name) {
        state.name = name;
      }
      if (description) {
        state.desc = description;
      }
      if (categoryId) {
        state.categoryId = categoryId;
      }
      if (vendorId) {
        state.vendorId = vendorId;
      }
      if (tags) {
        state.tags = [...tags];
      }
      if (sku) {
        state.sku = sku;
      }
      if (status) {
        state.status = status;
      }
      if (attributes) {
        state.attributes = [...attributes];
      }
      if (img) {
        state.coverImg = img;
      }
    },
    removeProduct: (state, action) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setProduct } = productSlice.actions;
// Action creators are generated for each case reducer function

export default productSlice.reducer;