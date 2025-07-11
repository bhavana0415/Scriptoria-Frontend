import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBooks } from "../../../api/dbBooks/api";
import { setIsLoading } from "../currentState/currentStateSlice";

export const fetchBooksAsync = createAsyncThunk(
  "fetchBooks",
  async (searches, { rejectWithValue }) => {
    try {
      const promises = searches.map(async (search) => {
        const response = await fetchBooks(
          `search/${search.replace(/ /g, "-")}`
        );
        return response.books ? response.books : [];
      });

      const results = await Promise.all(promises);
      return results.flat();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchRecentBooksAsync = createAsyncThunk(
  "fetchRecentBooks",
  async (_, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await fetchBooks();
      if (response) {
        return response.books ? response.books : [];
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const fetchData = createSlice({
  name: "fetchData",
  initialState: { books: null, error: null },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksAsync.fulfilled, (state, action) => {
        if (action.payload && Array.isArray(action.payload)) {
          state.books = action.payload;
        }
        state.error = null;
      })
      .addCase(fetchBooksAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.books = null;
      })
      .addCase(fetchRecentBooksAsync.fulfilled, (state, action) => {
        if (action.payload && Array.isArray(action.payload)) {
          state.books = action.payload;
        }
        state.error = null;
      })
      .addCase(fetchRecentBooksAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.books = null;
      });
  },
});

export default fetchData.reducer;
