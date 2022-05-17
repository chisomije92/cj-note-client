import React from "react";
import { useTypedSelector } from "../state/reducers/use-typed-selector";

const CellList = () => {
  const cells = useTypedSelector((state) => state);
  return <div>CellList</div>;
};

export default CellList;
