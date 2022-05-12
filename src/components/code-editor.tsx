import classes from "./code-editor.module.css";
import Editor, { OnChange } from "@monaco-editor/react";
import React, { useRef } from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  defaultValue: string;
  passValue: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ defaultValue, passValue }) => {
  const editorRef = useRef<any>();

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
    // console.log(editorRef.current);
  }

  const handleEditorChange: OnChange = (value, event) => {
    // console.log("here is the current model value:", value);
    if (value) {
      passValue(value);
    }
  };

  const onFormatClick = () => {
    // console.log(editorRef.current);
    const unformatted = editorRef.current.getModel().getValue();
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .trim();
    editorRef.current.setValue(formatted);
  };
  return (
    <div className={classes["editor-wrapper"]}>
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <Editor
        defaultValue={defaultValue}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        height="500px"
        language="javascript"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: {
            enabled: false,
          },
          showUnused: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
