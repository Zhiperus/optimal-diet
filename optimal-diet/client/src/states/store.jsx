import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import storage from "redux-persist/es/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import foodsReducer from "./foods/foodsSlice";
import userReducer from "./user/userSlice";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["auth"],
  stateReconciler: autoMergeLevel2,
};

const authPersistConfig = {
  key: "auth",
  storage: sessionStorage,
};

const rootReducer = combineReducers({
  foods: foodsReducer,
  user: persistReducer(authPersistConfig, userReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
