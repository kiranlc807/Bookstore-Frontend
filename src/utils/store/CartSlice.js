// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//     name:"cart",
//     initialState: {
//         cartItems: [],
//     },
//     reducers: {
//         addItemToCart: (state, action) => {
//             const bookToAdd = action.payload;
//             const existingIndex = state.cartItems.findIndex(val => val._id === bookToAdd._id);
//             console.log("Index",existingIndex);
//             console.log("CartItems",state.cartItems);
//             if (existingIndex !== -1) {
//               state.cartItems.items[existingIndex].quantity += 1;
//             }
//             else{
//             state.cartItems.push(action.payload);
//             }
//           },
//           setCartItems: (state, action) => {
//             state.cartItems = action.payload;
//         },
//         },
//         // setCartItems: (state, action) => {
//         //     state.cartItems = action.payload;
//         // },
//         // removeFromCart: (state, action) => {
//         //   const bookToRemove = action.payload;
//         //   const existingIndex = state.cartItems.items.findIndex(val => val.book_id === bookToRemove.book_id);
      
//         //     if (existingIndex !== -1 && state.cartItems.items[existingIndex].quantity > 1 ) {
//         //       state.cartItems.items[existingIndex].quantity -= 1;
//         //     } else {
//         //       state.cartItems.items.splice(existingIndex,1);
//         //     }
//         //   },
//     }
//     )

// export const {addItemToCart,setCartItems} = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    addItemToCart: (state, action) => {
      const bookToAdd = action.payload;
      const existingIndex = state.cartItems.findIndex(val => val._id === bookToAdd._id);
      if (existingIndex !== -1) {
        // If the book already exists in the cart, update its quantity
        state.cartItems[existingIndex].quantity += 1;
      } else {
        // If the book is not in the cart, add it with quantity set to 1
        state.cartItems.push({ ...bookToAdd, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const bookToRemove = action.payload;
      const existingIndex = state.cartItems.findIndex(val => val._id === bookToRemove._id);

      if (existingIndex !== -1 && state.cartItems[existingIndex].quantity > 1 ) {
        state.cartItems[existingIndex].quantity -= 1;
      } else {
        state.cartItems.splice(existingIndex,1);
      }
    },
  },
});

export const { addItemToCart, setCartItems, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;