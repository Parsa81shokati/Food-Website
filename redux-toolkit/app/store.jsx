import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from "../features/CheckoutSlice";

const store = configureStore({
  reducer: { checkout: checkoutReducer },
});
export default store;
