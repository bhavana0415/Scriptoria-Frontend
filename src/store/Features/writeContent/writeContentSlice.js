import { createSlice } from "@reduxjs/toolkit";

export const writeContentSlice = createSlice({
  name: 'currentState',
  initialState: { writeContent: [] },
  reducers: {
    setWriteContent: (state, action) => {
      state.writeContent = action.payload;
      console.log(action.payload);
    }
  }
});

export const { setWriteContent } = writeContentSlice.actions;

export default writeContentSlice.reducer;
