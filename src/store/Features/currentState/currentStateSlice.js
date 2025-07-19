import { createSlice } from "@reduxjs/toolkit";

const isBrowser = () => typeof window !== "undefined";

const getInitialMode = () => {
  if (isBrowser()) {
    return (localStorage.getItem("theme") || "light")
  }
  return "light";
};

export const currentStateSlice = createSlice({
  name: 'currentState',
  initialState: { currentMode: getInitialMode(), currentHeader: 'Home', isLoading: false, checkedItems: [] },
  reducers: {
    setCurrentMode: (state) => {
      const theme = state.currentMode === 'dark' ? 'light' : 'dark'
      state.currentMode = theme;
      if (isBrowser()) {
        localStorage.setItem("theme", theme);
      }
    },
    setCurrentHeader: (state, action) => {
      state.currentHeader = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCheckedItems: (state, action) => {
      state.checkedItems = action.payload;
    }
  }
});

export const { setCurrentHeader, setCurrentMode, setIsLoading, setCheckedItems } = currentStateSlice.actions;

export default currentStateSlice.reducer;
