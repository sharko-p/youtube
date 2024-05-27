







import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './counterSlice';

const store = configureStore({
  reducer: {
    // counter: counterReducer,
    // ...другие редюсеры, если есть
  },

});

export default store;


/////////////////////////////////////////////////////////////////////////////////


// import { combineReducers, configureStore, Store } from "@reduxjs/toolkit";
// // import taskManagerReducer from "./reducers/taskManagerReducer";

// const rootReducer = combineReducers({ taskManager: taskManagerReducer });

// const store: Store = configureStore({
//   reducer: rootReducer,

// });

// export type RootState = ReturnType<typeof rootReducer>;

// export { store };
