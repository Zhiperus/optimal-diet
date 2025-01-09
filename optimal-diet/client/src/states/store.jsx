import { configureStore } from "@reduxjs/toolkit";
import foodsReducer from "./foods/foodsSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    foods: foodsReducer,
    user: userReducer,
  },
});

export default store;
