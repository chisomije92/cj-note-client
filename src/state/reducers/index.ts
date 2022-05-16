import { configureStore } from "@reduxjs/toolkit";
import cellsSlice from "./cellReducers";

const store = configureStore({
  reducer: {
    cells: cellsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
