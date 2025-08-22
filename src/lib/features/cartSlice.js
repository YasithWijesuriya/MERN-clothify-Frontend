import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};


export const cartSlice = createSlice({
  
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const foundItem = state.cartItems.find((el) => el.product._id === newItem._id);
      if (!foundItem) {
        state.cartItems.push({ product: action.payload, quantity: 1 });
        return;
      }
      foundItem.quantity += 1;
      
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(
        (el) => el.product._id !== id
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart ,removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
