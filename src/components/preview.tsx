import React, { useEffect, useRef } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
}
const html = `
  <html>
  <head></head>
  <body>
  <div id='root'></div>
  <script>
  window.addEventListener('message', (event) => {
    try{
      eval(event.data);
    }catch(e){
 const root = document.querySelector('#root');
 root.innerHTML = '<div style="color: red"> <h4>Runtime Error</h4>' + e.message + '</div>';
console.log(e);
   }
  }, false)</script></body>
  </html>`;
const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (iframe.current) {
      iframe.current.srcdoc = html;
      iframe.current.contentWindow?.postMessage(code, "*");
    }
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        sandbox="allow-scripts"
        ref={iframe}
        srcDoc={html}
        title="preview"
      />
    </div>
  );
};

export default Preview;
