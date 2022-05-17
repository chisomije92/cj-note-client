import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { AppDispatch } from "../state";
import { cellsSliceActions } from "../state/reducers/cellReducers";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useCellActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(cellsSliceActions, dispatch);
};
