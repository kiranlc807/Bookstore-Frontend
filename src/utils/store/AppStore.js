import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import BookSlice from "./BookSlice";
 
const appStore = configureStore({
    reducer:{
        cart:CartSlice,
        books:BookSlice,
    }
})

export default appStore;