import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name:"book",
    initialState: {
        bookList: [],
    },
    reducers: {
        getBookList: (state,action)=>{
            state.cartItems.push(action.payload);
        }
    }
})

export const {getBookList} = bookSlice.actions;
export default bookSlice.reducer;