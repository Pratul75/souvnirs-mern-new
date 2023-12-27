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
  coverImg: null,
  readyToShip: null,
  freeShipping: null,
  customization: {},
  commission: {},
  minquantity: "",
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
        price,
        mrp,
        readyToShip,
        freeShipping,
        customization,
        commission,
        minquantity,
        stockQuantity,
      } = action.payload;
      if (stockQuantity) {
        state.stockQuantity = stockQuantity;
      }
      if (price) {
        state.price = price;
      }
      if (mrp) {
        state.mrp = mrp;
      }
      if (name) {
        state.name = name;
      }
      if (minquantity) {
        state.minquantity = minquantity;
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
      if (freeShipping) {
        state.freeShipping = freeShipping;
      }
      if (readyToShip) {
        state.readyToShip = readyToShip;
      }
      if (customization) {
        state.customization = customization;
      }
      if (commission) {
        state.commission = commission;
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
