import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MoveCellActionModel } from "../action-models";
import { Cell } from "../cell";

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    moveCell(state: CellState, action: PayloadAction<MoveCellActionModel>) {
      const { id, direction } = action.payload;
    },
  },
});
