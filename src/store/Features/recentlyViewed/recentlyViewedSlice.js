import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addRecent, deleteRecent, getRecents } from "../../../api/mongodb/api";

export const addRecentAsync = createAsyncThunk(
  "addRecent",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await addRecent({ ...data });
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      dispatch(getRecentsAsync(data.user));
    }
  }
);

export const deleteRecentAsync = createAsyncThunk(
  "deleteRecent",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await deleteRecent(data.bookId);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      dispatch(getRecentsAsync(data.user));
    }
  }
);

export const getRecentsAsync = createAsyncThunk(
  "getRecents",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getRecents({ userId });
      return response.recents || [];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

export const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState: { recentlyViewed: null },
  reducers: {
    setRecentlyViewedEmpty: (state) => {
      state.recentlyViewed = [];
    },
    addRecentFast: (state, action) => {
      state.recentlyViewed.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecentsAsync.fulfilled, (state, action) => {
        state.recentlyViewed = action.payload;
        state.error = null;
      })
      .addCase(getRecentsAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.recentlyViewed = [];
      });
  },
});

export const { setRecentlyViewedEmpty, addRecentFast } = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
