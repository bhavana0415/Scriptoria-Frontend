import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addFavourite,
  deleteFavourite,
  getFavourites,
} from "../../../api/mongodb/api";
import { showAlert } from "../alert/alertSlice";

export const addFavouriteAsync = createAsyncThunk(
  "addFavourite",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await addFavourite({ ...data });
      dispatch(
        showAlert({
          severity: "success",
          message: "Added to Favourites!!!",
        })
      );
      return response;
    } catch (error) {
      dispatch(
        showAlert({
          severity: "error",
          message: `Unable to add to Favourites. ${error.message}`,
        })
      );
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      dispatch(getFavouritesAsync(data.user));
    }
  }
);

export const deleteFavouriteAsync = createAsyncThunk(
  "deleteFavourite",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await deleteFavourite(data.book_id);
      dispatch(
        showAlert({
          severity: "success",
          message: "Deleted from Favourites!!!",
        })
      );
      return response;
    } catch (error) {
      dispatch(
        showAlert({
          severity: "error",
          message: `Unable to delete from Favourites. ${error.message}`,
        })
      );
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      dispatch(getFavouritesAsync(data.user));
    }
  }
);

export const getFavouritesAsync = createAsyncThunk(
  "getFavourites",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getFavourites({ userId });
      return response.favourites || [];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: { favourites: [] },
  reducers: {
    setFavouritesEmpty: (state) => {
      state.favourites = [];
    },
    addFavouriteFast: (state, action) => {
      state.favourites.push(action.payload);
    },
    removeFavouriteFast: (state, action) => {
      state.favourites = state.favourites.filter((book) => book.book_id !== action.payload)
    }
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

export const { setFavouritesEmpty, addFavouriteFast, removeFavouriteFast } = favouritesSlice.actions;

export default favouritesSlice.reducer;
