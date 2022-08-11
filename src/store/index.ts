import { configureStore } from "@reduxjs/toolkit";
import favourites from "@slices/favourites";

const store = configureStore({
  reducer: {
    favourites,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
