import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = { value: { _id: "", image: "", name: "", diets: [] } };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = { _id: "", image: "", name: "", diets: [] };
    },
    addDiet: (state, action) => {
      const diets = [...state.value.diets, action.payload];
      const temp = { ...state.value, diets: diets };
      console.log(temp);
      state.value = temp;
    },
    delDiet: (state, action) => {
      const diets = state.value.diets.filter(
        (diet) => diet.UID !== action.payload
      );
      const temp = { ...state.value, diets: diets };
      state.value = temp;
    },
  },
});

export const { login, logout, addDiet, delDiet } = userSlice.actions;

export default userSlice.reducer;
