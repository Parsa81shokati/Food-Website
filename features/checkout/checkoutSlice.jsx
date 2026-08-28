import { createSlice } from "@reduxjs/toolkit";
import { clearCheckout, loadCheckout, saveCheckout } from "./checkoutStorage";

const DEFAULT_FORM = {
  isForSelf: true,
  customerName: "",
  customerPhone: "",
  address: "",
  note: "",
  discountCode: "",
};

const initialState = {
  formData: loadCheckout() || DEFAULT_FORM,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutData(state, action) {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
      saveCheckout(state.formData);
    },

    resetCheckoutData(state) {
      state.formData = {
        isForSelf: true,
        customerName: "",
        customerPhone: "",
        address: "",
        note: "",
        discountCode: "",
      };

      clearCheckout();
    },
  },
});

export const { setCheckoutData, resetCheckoutData } = checkoutSlice.actions;

export default checkoutSlice.reducer;
