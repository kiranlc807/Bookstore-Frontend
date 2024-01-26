import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState: {
        cartItems: [],
    },
    reducers: {
        addItemToCart: (state, action) => {
            const bookToAdd = action.payload;
            const existingIndex = state.cartItems.findIndex(val => val._id === bookToAdd._id);
            if (existingIndex !== -1) {
              state.cartItems.items[existingIndex].quantity += 1;
            }
            else{
            state.cartItems.push(action.payload);
            }
          },
          setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
        },
        // setCartItems: (state, action) => {
        //     state.cartItems = action.payload;
        // },
        // removeFromCart: (state, action) => {
        //   const bookToRemove = action.payload;
        //   const existingIndex = state.cartItems.items.findIndex(val => val.book_id === bookToRemove.book_id);
      
        //     if (existingIndex !== -1 && state.cartItems.items[existingIndex].quantity > 1 ) {
        //       state.cartItems.items[existingIndex].quantity -= 1;
        //     } else {
        //       state.cartItems.items.splice(existingIndex,1);
        //     }
        //   },
    }
    )

export const {addItemToCart,setCartItems} = cartSlice.actions;
export default cartSlice.reducer;