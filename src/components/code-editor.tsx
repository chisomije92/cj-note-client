import Editor from "@monaco-editor/react";
import React, { useRef } from "react";

interface CodeEditorProps {
  defaultValue: string;
  passValue: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ defaultValue, passValue }) => {
  const editorRef = useRef<any>(null);

  //   function handleEditorDidMount(editor: any, monaco: any) {
  //     editorRef.current = editor;
  //     onChange(editor.current.getValue());
  //   }

  function handleEditorChange(value: any, event: any) {
    // console.log("here is the current model value:", value);
    passValue(value);
  }
  return (
    <Editor
      defaultValue={defaultValue}
      //   onMount={handleEditorDidMount}
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
      }}
    />
  );
};

export default CodeEditor;
