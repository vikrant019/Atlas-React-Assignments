import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};


function findItemById(items: CartItem[], id: number) {
  return items.find(item => item.id === id);
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: { payload: CartItem }) => {
      const existing = findItemById(state.items, action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: { payload: number }) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    incrementQuantity: (state, action: { payload: number }) => {
      const item = findItemById(state.items, action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action: { payload: number }) => {
      const item = findItemById(state.items, action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
