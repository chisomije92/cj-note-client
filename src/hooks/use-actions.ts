import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { AppDispatch } from "../state";
import { bundleSliceActions } from "../state";
import { cellsSliceActions } from "../state";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useCellActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(cellsSliceActions, dispatch);
};

export const useBundleActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(bundleSliceActions, dispatch);
};
