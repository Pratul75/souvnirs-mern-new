import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/count/counterSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
