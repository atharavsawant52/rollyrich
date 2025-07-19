import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, size } = action.payload;
      const exists = state.items.find(
        (item) => item.id === id && item.size === size
      );

      if (!exists) {
        state.items.push({ ...action.payload, quantity: 1 });
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    removeFromCart(state, action) {
      const { id, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size)
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    updateQuantity(state, action) {
      const { id, size, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id && i.size === size);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
