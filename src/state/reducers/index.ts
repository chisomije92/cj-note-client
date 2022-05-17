import { configureStore } from "@reduxjs/toolkit";
import cellsSlice from "./cellReducers";
import { cellsSliceActions } from "./cellReducers";
const store = configureStore({
  reducer: {
    cells: cellsSlice.reducer,
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

store.dispatch(cellsSliceActions.insertCellBefore({ id: null, type: "text" }));
store.dispatch(cellsSliceActions.insertCellBefore({ id: null, type: "code" }));
store.dispatch(cellsSliceActions.insertCellBefore({ id: null, type: "text" }));
// console.log(store.getState());
