import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addFavourite,
  deleteFavourite,
  getFavourites,
} from "../../../api/mongodb/api";
import { setIsLoading } from "../currentState/currentStateSlice";

export const addFavouriteAsync = createAsyncThunk(
  "addFavourite",
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await addFavourite({ ...data });
      if (response) dispatch(getFavouritesAsync(data.user));

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

export const deleteFavouriteAsync = createAsyncThunk(
  "deleteFavourite",
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await deleteFavourite(data.book_id);
      if (response) dispatch(getFavouritesAsync(data.user));

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

export const getFavouritesAsync = createAsyncThunk(
  "getFavourites",
  async (userId, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await getFavourites({ userId });
      return response.favourites || [];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: { favourites: [] },
  reducers: {
    setFavouritesEmpty: (state, action) => {
      state.favourites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavouritesAsync.fulfilled, (state, action) => {
        state.favourites = action.payload;
        state.error = null;
      })
      .addCase(getFavouritesAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.favourites = [];
      });
  },
});

export const { setFavouritesEmpty } = favouritesSlice.actions;

export default favouritesSlice.reducer;
