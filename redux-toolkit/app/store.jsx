import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from "../../features/checkout/checkoutSlice";
import cartReducer from "../../features/cart/cartSlice.js.jsx";

const store = configureStore({
  reducer: { cart: cartReducer, checkout: checkoutReducer },
});
export default store;
