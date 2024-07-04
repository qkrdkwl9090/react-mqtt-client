const esbuild = require('esbuild');
const { dependencies } = require('./package.json');
const fs = require('fs');

if (fs.existsSync('./dist')) {
  fs.rmSync('./dist', { recursive: true });
}

const sharedConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  external: Object.keys(dependencies),
  sourcemap: true,
  minify: true,
};

esbuild
  .build({
    ...sharedConfig,
    outfile: 'dist/index.js',
    format: 'cjs',
    platform: 'node',
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    ...sharedConfig,
    outfile: 'dist/index.esm.js',
    format: 'esm',
  })
  .catch(() => process.exit(1));
