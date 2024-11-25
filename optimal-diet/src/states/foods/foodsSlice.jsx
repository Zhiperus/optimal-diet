import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

const foodsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
    },
    del: (state, action) => {
      state.value = state.value.filter(
        (transaction) => transaction !== action.payload
      );
    },
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { add, del, set } = foodsSlice.actions;

export default foodsSlice.reducer;
