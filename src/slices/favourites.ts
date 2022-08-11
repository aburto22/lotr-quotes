import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = [];

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<string>) => {
      if (state.includes(action.payload)) {
        return state.filter((f) => f !== action.payload);
      }
      return [...state, action.payload];
    },
  },
});

export const { toggleFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;
