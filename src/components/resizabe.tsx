import React from "react";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  // @ts-ignore
  children: React.Element<any>;
}

// type ResizableProps = {
//   direction: "horizontal" | "vertical";
//   children: React.Element<any>;
// };
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return <div>{children}</div>;
};

export default Resizable;
