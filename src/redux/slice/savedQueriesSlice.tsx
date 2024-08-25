import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Task, SavedQueriesState } from "./savedQueriesSlice.types";

const initialState: SavedQueriesState = {
  savedQueries: JSON.parse(localStorage.getItem("savedQueries") || "[]"),
  openModalWindow: false,
  currentQueryId: null,
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
    setCurrentQueryId(state, action: PayloadAction<string | null>) {
      state.currentQueryId = action.payload;
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
    addQuery(state, action: PayloadAction<Omit<Task, "id">>) {
      const newTask: Task = { ...action.payload, id: uuidv4() };
      state.savedQueries.push(newTask);
      localStorage.setItem("savedQueries", JSON.stringify(state.savedQueries));
    },
    deleteQuery(state, action: PayloadAction<string>) {
      state.savedQueries = state.savedQueries.filter(
        (task) => task.id !== action.payload
      );
      localStorage.setItem("savedQueries", JSON.stringify(state.savedQueries));
    },
  },
});

export const {
  saveQuery,
  setOpenModalWindow,
  setCurrentQueryId,
  setQuery,
  setInputValue,
  setSavedQuery,
  addQuery,
  deleteQuery,
} = savedQueriesSlice.actions;

export default savedQueriesSlice.reducer;
