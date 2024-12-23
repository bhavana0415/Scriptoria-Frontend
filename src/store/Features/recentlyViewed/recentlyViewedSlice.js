import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addRecent, deleteRecent, getRecents } from "../../../api/mongodb/api";
import { setIsLoading } from "../currentState/currentStateSlice";
import { showAlert } from "../alert/alertSlice";

export const addRecentAsync = createAsyncThunk(
  "addRecent",
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await addRecent({ ...data });
      if (response) dispatch(getRecentsAsync(data.user));
      dispatch(
        showAlert({
          severity: "success",
          message: "Added to Recent Books!!!",
        })
      );
      return response;
    } catch (error) {
      dispatch(
        showAlert({
          severity: "error",
          message: `Unable to add to Recent Books. ${error.message}`,
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

export const deleteRecentAsync = createAsyncThunk(
  "deleteRecent",
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await deleteRecent(data.bookId);
      if (response) dispatch(getRecentsAsync(data.user));
      dispatch(
        showAlert({
          severity: "success",
          message: "Deleted from Recent Books!!!",
        })
      );
      return response;
    } catch (error) {
      dispatch(
        showAlert({
          severity: "error",
          message: `Unable to delete from Recent Books. ${error.message}`,
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

export const getRecentsAsync = createAsyncThunk(
  "getRecents",
  async (userId, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await getRecents({ userId });
      return response.recents || [];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState: { recentlyViewed: [] },
  reducers: {
    setRecentlyViewedEmpty: (state, action) => {
      state.recentlyViewed = [];
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

export const { setRecentlyViewedEmpty } = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
