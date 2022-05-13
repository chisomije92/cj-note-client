import React from "react";
import { ResizableBox } from "react-resizable";
import "./resizable.css";
interface ResizableProps {
  direction: "horizontal" | "vertical";
  // @ts-ignore
  children: React.Element<any>;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox width={Infinity} height={400} resizeHandles={["s"]}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
