import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import BookSlice from "./BookSlice";
import WishListSlice from "./WishListSlice";
import AddressSlice from "./AddressSlice";
 
const appStore = configureStore({
    reducer:{
        cart:CartSlice,
        book:BookSlice,
        wishlist:WishListSlice,
        address:AddressSlice,
    }
})

export default appStore;