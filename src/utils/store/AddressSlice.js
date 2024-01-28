import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addressData: [],
  },
  reducers: {
    setAddress: (state, action) => {
      state.addressData = action.payload;
    },
    addNewAddress: (state, action) => {
      state.addressData.push(action.payload);
    },
  },
});

export const { setAddress, addNewAddress } = addressSlice.actions;

export default addressSlice.reducer;