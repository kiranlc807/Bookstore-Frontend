import { createSlice } from "@reduxjs/toolkit";

const wishSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    setWishlistItems: (state, action) => {
      state.wishlistItems = action.payload;
    },
    addItemToWishlist: (state, action) => {
      const bookToAdd = action.payload;
      const existingIndex = state.wishlistItems.findIndex(val => val.book_id === bookToAdd.book_id);

      if (existingIndex !== -1) {
        state.wishlistItems.splice(existingIndex, 1);
      } else {
        state.wishlistItems.push(bookToAdd);
      }
    },
  },
});

export const { setWishlistItems, addItemToWishlist } = wishSlice.actions;

export default wishSlice.reducer;