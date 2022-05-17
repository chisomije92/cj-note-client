import { configureStore } from "@reduxjs/toolkit";
import cellsSlice from "./cellReducers";

const store = configureStore({
  reducer: {
    cells: cellsSlice.reducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;

// store.dispatch({
//   type: "cells/insertCellBefore",
//   payload: {
//     id: null,
//     type: "code",
//   },
// });

// console.log(store.getState());
