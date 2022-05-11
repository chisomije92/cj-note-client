import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (input: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: input,
          };
        } else {
          //   const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          //     args.path
          //   );
          //   if (cachedResult) {
          //     return cachedResult;
          //   }
          let { data, request } = await axios.get(args.path);
          const fileType = args.path.match(/.css$/) ? "css" : "jsx";
          const escaped = data
            .replace(/\n/g, "")
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'");

          const contents =
            fileType === "css"
              ? `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);`
              : data;

          const result: esbuild.OnLoadResult = {
            loader: "jsx",
            contents,
            resolveDir: new URL("./", request.responseURL).pathname,
          };
          await fileCache.setItem(args.path, result);
          return result;
        }
      });
    },
  };
};
