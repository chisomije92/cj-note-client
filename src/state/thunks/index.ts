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
      const {
        cells: { order },
      } = getState();
      if (order.length === 0 && !cellCache) {
        dispatch(cellsSliceActions.fetchCellsComplete(defaultCell));
      } else {
        if (cellCache) {
          cellCache.getItem<Cell[]>("cells").then((cells) => {
            if (cells) {
              dispatch(cellsSliceActions.fetchCellsComplete(cells));
            } else {
              dispatch(cellsSliceActions.fetchCellsComplete(defaultCell));
            }
          });
        }
      }
    } catch (err: any) {
      dispatch(cellsSliceActions.fetchCellsError(err.message));
    }
  };
};

export const saveCells = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState();

    const cells = order.map((id) => data[id]);
    try {
      await cellCache.setItem("cells", cells);
    } catch (err: any) {
      dispatch(cellsSliceActions.saveCellsError(err.message));
    }
  };
};
