import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState: {
        cartItems: [],
    },
    reducers: {
        addItemToCart: (state,action)=>{
            state.cartItems.push(action.payload);
        }
    }
})

export const {addItemToCart} = cartSlice.actions;
export default cartSlice.reducer;