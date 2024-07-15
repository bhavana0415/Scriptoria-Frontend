import { configureStore } from "@reduxjs/toolkit";
import currentStateSlice from "./Features/currentState/currentStateSlice";
import fetchDataSlice from "./Features/fetchData/fetchDataSlice";

const localStorageMiddleware = store => next => action => {
    const result = next(action);
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
    return result;
  };
  
  // Function to load state from localStorage
  const reHydrateStore = () => {
    const data = localStorage.getItem('reduxState');
    if (data) {
      return JSON.parse(data);
    }
    return undefined;
  };

export const store = configureStore({
    reducer: {
        currentState: currentStateSlice,
        fetchData: fetchDataSlice,
    },
    preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})

export const RootState = () => store.getState();
export const AppDispatch = store.dispatch;