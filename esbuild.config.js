const esbuild = require("esbuild");
const { dependencies } = require("./package.json");

const sharedConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  external: Object.keys(dependencies),
  sourcemap: true,
};

esbuild.build({
  ...sharedConfig,
  outfile: "dist/index.js",
  format: "cjs",
  platform: "node",
});

esbuild.build({
  ...sharedConfig,
  outfile: "dist/index.esm.js",
  format: "esm",
});
