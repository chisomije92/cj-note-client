import MDEditor from "@uiw/react-md-editor";
import React from "react";

const TextEditor: React.FC = () => {
  return (
    <div>
      {/* <MDEditor /> */}
      <MDEditor.Markdown source={"# Header"} />
    </div>
  );
};

export default TextEditor;
