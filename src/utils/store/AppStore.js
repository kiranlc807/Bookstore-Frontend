import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import BookSlice from "./BookSlice";
 
const appStore = configureStore({
    reducer:{
        cart:CartSlice,
        book:BookSlice,
    }
})

export default appStore;