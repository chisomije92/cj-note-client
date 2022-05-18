import React, { Fragment } from "react";
import "./cell-list.css";
import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";

const CellList = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));
  return (
    <div className="cell-list">
      <AddCell prevCellId={null} forceVisible={cells.length === 0} />
      {renderedCells}
    </div>
  );
};

export default CellList;
