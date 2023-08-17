import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/count/counterSlice";
import appConfigReducer from "./features/appConfig/appSlice";
import addProductSlice from "./features/appConfig/addProductSlice";
import { wishlistSlice } from "./features/appConfig/WishlistSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    appConfig: appConfigReducer,
    product: addProductSlice,
    wishlist: wishlistSlice.reducer,
  },
});
