import { configureStore } from "@reduxjs/toolkit";

import savedQueriesReducer from "./slice/savedQueriesSlice";

const store = configureStore({
  reducer: {
    savedQueries: savedQueriesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
