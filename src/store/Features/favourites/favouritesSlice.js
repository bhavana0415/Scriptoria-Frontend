import { createSlice } from "@reduxjs/toolkit";

export const favouritesSlice = createSlice({
  name: 'currentState',
  initialState: { favourites: [] },
  reducers: {
    setFavourites: (state, action) => {
      state.favourites = action.payload;
    },
  }
});

export const { setFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
