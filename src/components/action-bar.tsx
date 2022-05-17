import React from "react";
import { useCellActions } from "../hooks/use-actions";

interface ActionBarProps {
  id: string;
}
const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useCellActions();
  return (
    <div>
      <button onClick={() => moveCell({ id, direction: "up" })}>Up</button>
      <button onClick={() => moveCell({ id, direction: "down" })}>Down</button>
      <button onClick={() => deleteCell(id)}>Delete</button>
    </div>
  );
};

export default ActionBar;
