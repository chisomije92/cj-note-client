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
  return async (dispatch, getState: () => RootState) => {
    dispatch(cellsSliceActions.fetchCellsStart());
    try {
      //   const { data } = getState().cells.data;
      //   const { order } = getState().cells;
      const {
        cells: { data, order },
      } = getState();
      if (order.length === 0) {
        dispatch(cellsSliceActions.fetchCellsComplete(defaultCell));
      } else {
        console.log("data");
        const cells = order.map((id) => data[id]);
        dispatch(cellsSliceActions.fetchCellsComplete(cells));
      }
      console.log(data);
      console.log(order);
    } catch (err: any) {
      //   dispatch(cellsSliceActions.fetchCellsError(err.message));
    }
  };
};
