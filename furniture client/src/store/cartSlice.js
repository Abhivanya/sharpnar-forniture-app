import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: {},
  totalAmount: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    replaceCart(state, action) {
      state.cartItems = action.payload || {};

      state.totalAmount = 0;
      state.totalCount = 0;

      Object.values(state.cartItems).forEach((item) => {
        state.totalAmount += item.price * item.cartQuantity;
        state.totalCount += item.cartQuantity;
      });
    },
    cleanCart() {
      state.cartItems = {};
      state.totalAmount = 0;
      state.totalCount = 0;
    },
    // addItem(state, action) {
    //   return;
    //   const newItem = action.payload;
    //   const existItem = state.cartItems.find((item) => item.id === newItem.id);
    //   if (existItem) {
    //     existItem.quantity++;
    //     existItem.total += existItem.price;
    //   } else {
    //     state.cartItems.push({
    //       id: newItem.id,
    //       title: newItem.title,
    //       price: newItem.price,
    //       total: newItem.price,
    //       quantity: 1,
    //     });
    //   }
    //   state.totalAmount += newItem.price;
    //   state.totalCount++;
    //   state.cartChanged = true;
    // },
    // removeItem(state, action) {
    //   return;
    //   const id = action.payload;
    //   const existingItem = state.cartItems.find((item) => item.id === id);
    //   if (existingItem.quantity === 1) {
    //     state.cartItems = state.cartItems.filter((item) => item.id !== id);
    //   } else {
    //     existingItem.quantity--;
    //     existingItem.total -= existingItem.price;
    //   }
    //   state.totalAmount -= existingItem.price;
    //   state.totalCount--;

    //   state.cartChanged = true;
    // },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
