import { configureStore } from "@reduxjs/toolkit";
import currentStateSlice from "./Features/currentState/currentStateSlice";

export const store = configureStore({
    reducer: {
        currentState: currentStateSlice,
    }
})

export const RootState = store.getState;
export const AppDispatch = store.dispatch;