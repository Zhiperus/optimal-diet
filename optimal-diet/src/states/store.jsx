import { configureStore } from "@reduxjs/toolkit";

import foodsReducer from "./foods/foodsSlice";

export const store = configureStore({
  reducer: {
    foods: foodsReducer,
  },
});

export default store;
