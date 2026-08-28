import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { loadCart } from "./storage";

const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart: (state, action) => {
      state.selectedItems = action.payload;
    },
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
          (i) => i.id !== action.payload.id,
        );
      }
    },
    deleteItem: (state, action) => {
      console.log("action.payload", action.payload);

      state.selectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id,
      );
    },
    clearCart: (state) => {
      state.selectedItems = [];
      state.itemsCounter = 0;
      state.total = 0;
      state.checkout = false;
    },
  },
});

export const { addItem, removeItem, deleteItem, hydrateCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
