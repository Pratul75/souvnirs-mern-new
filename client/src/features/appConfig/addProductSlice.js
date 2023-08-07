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
    variants: []
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct: (state, action) => {

            console.log(action.payload);
            const { name, description, vendorId, categoryId, tags, sku, status } = action.payload
            if (name) {
                state.name = name
            }
            if (description) {
                state.desc = description
            }
            if (categoryId) {
                state.categoryId = categoryId
            }
            if (vendorId) { state.vendorId = vendorId }
            if (tags) {
                state.tags = [...tags]
            }
            if (sku) {
                state.sku = sku
            }
            if (status) {
                state.status = status
            }


        },
        removeProduct: (state, action) => {
            Object.assign(state, initialState);
        }
    },
});


export const { setProduct } = productSlice.actions
// Action creators are generated for each case reducer function

export default productSlice.reducer;
