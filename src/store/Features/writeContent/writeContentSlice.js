import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} from "../../../api/mongodb/api";
import { setIsLoading } from "../currentState/currentStateSlice";

export const getBooksAsync = createAsyncThunk(
  "getBooks",
  async (userId, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await getBooks({ userId });
      return response.books || [];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const addBookAsync = createAsyncThunk(
  "addBook",
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await addBook({ ...data });
      if (response) dispatch(getBooksAsync(data.user));

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

export const updateBookAsync = createAsyncThunk(
  "updateBook",
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await updateBook({ ...data });
      if (response) dispatch(getBooksAsync(data.user));

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

export const deleteBookAsync = createAsyncThunk(
  "deleteBook",
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await deleteBook(data.bookId);
      if (response) dispatch(getBooksAsync(data.user));

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

export const writeContentSlice = createSlice({
  name: "books",
  initialState: { books: [] },
  reducers: {
    setBooksEmpty: (state, action) => {
      state.writeContent = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooksAsync.fulfilled, (state, action) => {
        state.books = action.payload;
        state.error = null;
      })
      .addCase(getBooksAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.books = [];
      });
  },
});

export const { setBooksEmpty } = writeContentSlice.actions;

export default writeContentSlice.reducer;
