import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signup, login, getUsers } from "../../../api/mongodb/api";
import { setIsLoading } from "../currentState/currentStateSlice";
import {
  getBooksAsync,
  setBooksEmpty,
} from "../writeContent/writeContentSlice";
import {
  getRecentsAsync,
  setRecentlyViewedEmpty,
} from "../recentlyViewed/recentlyViewedSlice";
import {
  getFavouritesAsync,
  setFavouritesEmpty,
} from "../favourites/favouritesSlice";

export const signupAsync = createAsyncThunk(
  "signup",
  async ({ name, email, password, image }, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await signup({ name, email, password, image });

      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const loginAsync = createAsyncThunk(
  "login",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await login({ email, password });
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const getUsersAsync = createAsyncThunk(
  "getUsers",
  async (_, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await getUsers();

      return response || [];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "logout",
  async (_, { dispatch }) => {
    dispatch(setBooksEmpty());
    dispatch(setRecentlyViewedEmpty());
    dispatch(setFavouritesEmpty());
    return true;
  }
);

export const auth = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    setUserOnLogout: (state, action) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.user = null;
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.user = null;
        state.error = null;
      });
  },
});

export const { setUserOnLogout } = auth.actions;

export default auth.reducer;
