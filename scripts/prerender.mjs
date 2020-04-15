import { readFile, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import { build } from 'vite'

// Render the complete page at build time for crawlers, quick first paint,
// and readable content when JavaScript is unavailable. Hosting stays static.
const serverOutput = 'node_modules/.cache/portfolio-ssr'
await build({
  publicDir: false,
  build: { ssr: 'src/entry-server.tsx', outDir: serverOutput, emptyOutDir: true },
})

const { render } = await import(pathToFileURL(resolve(serverOutput, 'entry-server.js')).href)
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
if (!template.includes('<!--app-html-->')) throw new Error('Missing prerender target')
await writeFile(new URL('../dist/index.html', import.meta.url), template.replace('<!--app-html-->', render()))
console.log('Prerendered the complete portfolio to dist/index.html.')
