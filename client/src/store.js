import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/count/counterSlice";
import appConfigReducer from "./features/appConfig/appSlice";
import addProductSlice from "./features/appConfig/addProductSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    appConfig: appConfigReducer,
    product: addProductSlice,
  },
});
