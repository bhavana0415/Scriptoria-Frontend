import { createSlice } from "@reduxjs/toolkit";

export const currentStateSlice = createSlice({
  name: 'currentState',
  initialState: { currentMode: 'dark', currentHeader: 'Home', isLoading: false, favourites: [], search: "", checkedItems: [], writeContent: [] },
  reducers: {
    setCurrentMode: (state, action) => {
      state.currentMode = action.payload;
    },
    setCurrentHeader: (state, action) => {
      state.currentHeader = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setFavourites: (state, action) => {
      state.favourites = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCheckedItems: (state, action) => {
      state.checkedItems = action.payload;
    },
    setWriteContent: (state, action) => {
      state.writeContent = action.payload;
    }
  }
});

export const { setCurrentHeader, setCurrentMode, setIsLoading, setFavourites, setSearch, setCheckedItems, setWriteContent } = currentStateSlice.actions;

export default currentStateSlice.reducer;
