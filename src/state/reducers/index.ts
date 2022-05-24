import { configureStore } from "@reduxjs/toolkit";
import bundleSlice, { bundleSliceActions } from "./bundleReducers";
import { AnyAction } from "redux";
import cellsSlice from "./cellReducers";
import thunk from "redux-thunk";
import { ThunkAction } from "@reduxjs/toolkit";
import { bundler } from "../../bundler";
import { persistMiddleware } from "../middleware/persist-middleware";

const store = configureStore({
  reducer: {
    cells: cellsSlice.reducer,
    bundle: bundleSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk).prepend(persistMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const createBundle = (
  cellId: string,
  input: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(bundleSliceActions.bundleStart({ cellId }));

    const result = await bundler(input);
    dispatch(bundleSliceActions.bundleComplete({ cellId, bundle: result }));
  };
};
