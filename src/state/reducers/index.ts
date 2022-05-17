import { configureStore } from "@reduxjs/toolkit";
import bundleSlice from "./bundleReducers";
import cellsSlice from "./cellReducers";

const store = configureStore({
  reducer: {
    cells: cellsSlice.reducer,
    bundle: bundleSlice.reducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// store.dispatch({
//   type: "cells/insertCellBefore",
//   payload: {
//     id: null,
//     type: "code",
//   },
// });

// store.dispatch({
//   type: "cells/insertCellBefore",
//   payload: {
//     id: null,
//     type: "code",
//   },
// });

// store.dispatch(cellsSliceActions.insertCellAfter({ id: null, type: "text" }));
// store.dispatch(cellsSliceActions.insertCellAfter({ id: null, type: "code" }));

// console.log(store.getState());
