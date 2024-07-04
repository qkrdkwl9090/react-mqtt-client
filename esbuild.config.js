const esbuild = require('esbuild');
const { dependencies } = require('./package.json');
const babel = require('@babel/core');

const sharedConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  external: Object.keys(dependencies),
  sourcemap: true,
  loader: {
    '.js': 'jsx',
    '.ts': 'tsx',
  },
};

esbuild.build({
  ...sharedConfig,
  outfile: 'dist/index.js',
  format: 'cjs',
  platform: 'node',
  plugins: [
    {
      name: 'babel',
      setup(build) {
        build.onLoad({ filter: /\.[jt]sx?$/ }, async (args) => {
          const source = await require('fs').promises.readFile(
            args.path,
            'utf8',
          );
          const { code } = await babel.transformAsync(source, {
            filename: args.path,
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          });
          return { contents: code, loader: 'jsx' };
        });
      },
    },
  ],
});

esbuild.build({
  ...sharedConfig,
  outfile: 'dist/index.esm.js',
  format: 'esm',
  plugins: [
    {
      name: 'babel',
      setup(build) {
        build.onLoad({ filter: /\.[jt]sx?$/ }, async (args) => {
          const source = await require('fs').promises.readFile(
            args.path,
            'utf8',
          );
          const { code } = await babel.transformAsync(source, {
            filename: args.path,
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          });
          return { contents: code, loader: 'jsx' };
        });
      },
    },
  ],
});
