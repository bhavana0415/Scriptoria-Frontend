import { createSlice } from "@reduxjs/toolkit";

export const recentlyViewedSlice = createSlice({
  name: 'currentState',
  initialState: { recentlyViewed: [] },
  reducers: {
    setRecentlyViewed: (state, action) => {
      state.recentlyViewed = action.payload;
    },
  }
});

export const { setRecentlyViewed } = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
