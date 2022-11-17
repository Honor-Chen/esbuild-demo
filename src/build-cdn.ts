import { build } from 'esbuild'
import { resolve } from 'node:path'

import httpImportPlugin from '../plugins/http-import-plugin'

async function runBuild() {
  await build({
    absWorkingDir: resolve(process.cwd(), 'src'),
    entryPoints: [resolve(process.cwd(), 'example/react-cdn.js')],
    outdir: resolve(process.cwd(), 'dist'),
    bundle: true,
    format: 'esm',
    splitting: true,
    sourcemap: false,
    metafile: true,
    plugins: [httpImportPlugin],
    loader: {
      '.js': 'jsx',
    },
  })
  console.log('build finished....')
}

runBuild()
