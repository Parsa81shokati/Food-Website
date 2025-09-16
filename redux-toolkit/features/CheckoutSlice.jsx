import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.selectedItems.find((i) => i.id === action.payload.id);
      if (!item) {
        state.selectedItems.push({ ...action.payload, quantity: 1 });
      } else {
        item.quantity += 1;
      }
    },
    removeItem: (state, action) => {
      const item = state.selectedItems.find((i) => i.id === action.payload.id);
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.selectedItems = state.selectedItems.filter(
          (i) => i.id !== action.payload.id
        );
      }
    },
  },
});

export const { addItem, removeItem } = checkoutSlice.actions;
export default checkoutSlice.reducer;
