import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name:"book",
    initialState: {
        bookList: [],
    },
    reducers: {
        getBookList: (state,action)=>{
            state.bookList.push(action.payload);
        },
        addBooks: (state,action)=>{
            state.bookList = action.payload;
        }
    }
})

export const {getBookList,addBooks} = bookSlice.actions;
export default bookSlice.reducer;