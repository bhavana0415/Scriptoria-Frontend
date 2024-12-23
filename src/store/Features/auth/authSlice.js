import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signup, login, getUsers } from "../../../api/mongodb/api";
import { setIsLoading } from "../currentState/currentStateSlice";
import { setBooksEmpty } from "../writeContent/writeContentSlice";
import { setRecentlyViewedEmpty } from "../recentlyViewed/recentlyViewedSlice";
import { setFavouritesEmpty } from "../favourites/favouritesSlice";
import { showAlert } from "../alert/alertSlice";

export const signupAsync = createAsyncThunk(
  "signup",
  async ({ name, email, password, image }, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await signup({ name, email, password, image });
      dispatch(
        showAlert({
          severity: "success",
          message: "Registeration successful!!!",
        })
      );
      return response;
    } catch (error) {
      dispatch(
        showAlert({
          severity: "error",
          message: `Unable to register. ${error.message || "Try again"}`,
        })
      );
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
      dispatch(
        showAlert({
          severity: "success",
          message: "Login successful!!!",
        })
      );
      return response;
    } catch (error) {
      dispatch(
        showAlert({
          severity: "error",
          message: `Unable to login. ${error.message || "Try again"}`,
        })
      );
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
    dispatch(
      showAlert({
        severity: "success",
        message: "Logout successful!!!",
      })
    );
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
    setUserOnLogout: (state) => {
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
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      });
  },
});

export const { setUserOnLogout } = auth.actions;

export default auth.reducer;
