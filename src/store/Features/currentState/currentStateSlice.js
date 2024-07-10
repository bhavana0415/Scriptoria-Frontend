import { createSlice } from "@reduxjs/toolkit";

export const currentStateSlice = createSlice({
    name: 'currentState',
    initialState: {currentMode: 'dark', currentHeader: 'Home'},
    reducers: {
        setCurrentMode: (state, action) => {
            state.currentMode = action.payload;
        },
        setCurrentHeader: (state, action) => {
            state.currentHeader = action.payload;
        }
    }
})

export const {setCurrentHeader, setCurrentMode} = currentStateSlice.actions;

export default currentStateSlice.reducer;
