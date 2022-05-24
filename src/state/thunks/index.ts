import { ThunkAction } from "@reduxjs/toolkit";
import { Cell } from "../cell";
import { RootState } from "../reducers";
import { cellsSliceActions } from "../reducers/cellReducers";
import { AnyAction } from "redux";
import localforage from "localforage";
import { defaultCell } from "../default-cells";

const cellCache = localforage.createInstance({
  name: "cellCache",
});

export const fetchCells = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    dispatch(cellsSliceActions.fetchCellsStart());
    try {
      const { data } = getState().cells.data;
      const { order } = getState().cells;
      if (order.length === 0) {
        // console.log("no data");

        dispatch(cellsSliceActions.fetchCellsComplete(defaultCell));
      } else {
        console.log("data");
        dispatch(cellsSliceActions.fetchCellsComplete([data]));
      }
      //   console.log(data);
      //   console.log(getState().cells.order);
    } catch (err: any) {
      //   dispatch(cellsSliceActions.fetchCellsError(err.message));
    }
  };
};
