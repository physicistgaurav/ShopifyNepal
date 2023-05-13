import { configureStore } from "@reduxjs/toolkit";
import MyProductReducer from "./MyProductSlice";
import MyCartReducer from "./MyCartSlice";

export const mystore = configureStore({
  reducer: {
    product: MyProductReducer,
    cart: MyCartReducer,
  },
});
