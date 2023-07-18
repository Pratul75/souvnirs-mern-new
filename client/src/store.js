import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/count/counterSlice";
import appConfigReducer from "./features/appConfig/appSlice";
import { collectionConditionApi } from "./services/collectionCondition";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    appConfig: appConfigReducer,
    // Add the generated reducer as a specific top-level slice
    [collectionConditionApi.reducerPath]: collectionConditionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(collectionConditionApi.middleware),
});

setupListeners(store.dispatch);
