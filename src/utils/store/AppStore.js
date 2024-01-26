import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import BookSlice from "./BookSlice";
import WishListSlice from "./WishListSlice";
 
const appStore = configureStore({
    reducer:{
        cart:CartSlice,
        book:BookSlice,
        wishlist:WishListSlice,
    }
})

export default appStore;