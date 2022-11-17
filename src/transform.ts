import { readFile } from 'node:fs/promises'
import { transform, transformSync } from 'esbuild'

async function runTransform() {
  const content = await readFile('./assets/test.png', 'utf8')
  const result = await transform(content, {
    loader: 'dataurl',
  })
  console.log(result)
}

runTransform()
