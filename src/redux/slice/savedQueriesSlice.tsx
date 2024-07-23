import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Task= {
  title: string;
  maxAmount: number;
  sortBy: string;
  query: string;
}

type SavedQueriesState= {
  savedQueries: Task[];
  openModalWindow: boolean;
  currentQueryIndex: number | null;
  query: string;
  inputValue: number;
  savedQuery: string;
}

const initialState: SavedQueriesState = {
  savedQueries: JSON.parse(localStorage.getItem("savedQueries") || "[]"),
  openModalWindow: false,
  currentQueryIndex: null,
  query: "",
  inputValue: 12,
  savedQuery: "",
};

const savedQueriesSlice = createSlice({
  name: "savedQueries",
  initialState,
  reducers: {
    saveQuery(state, action: PayloadAction<Task[]>) {
      state.savedQueries = action.payload;
      localStorage.setItem("savedQueries", JSON.stringify(state.savedQueries));
    },
    setOpenModalWindow(state, action: PayloadAction<boolean>) { 
      state.openModalWindow = action.payload;
    },
    setCurrentQueryIndex(state, action: PayloadAction<number | null>) {
      state.currentQueryIndex = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setInputValue(state, action: PayloadAction<number>) {
      state.inputValue = action.payload;
    },
    setSavedQuery(state, action: PayloadAction<string>) {
      state.savedQuery = action.payload;
    },
    addQuery(state, action: PayloadAction<Task>) {
      state.savedQueries.push(action.payload);
      localStorage.setItem("savedQueries", JSON.stringify(state.savedQueries));
    },
    deleteQuery(state, action: PayloadAction<number>) {
      state.savedQueries.splice(action.payload, 1);
      localStorage.setItem("savedQueries", JSON.stringify(state.savedQueries));
    },
  },
});

export const {
  saveQuery,
  setOpenModalWindow, 
  setCurrentQueryIndex,
  setQuery,
  setInputValue,
  setSavedQuery,
  addQuery,
  deleteQuery,
} = savedQueriesSlice.actions;

export default savedQueriesSlice.reducer;
