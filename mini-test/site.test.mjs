import assert from 'node:assert/strict'
import { readFile, readdir, stat } from 'node:fs/promises'
import test from 'node:test'

const output = new URL('../dist/', import.meta.url)
const html = await readFile(new URL('index.html', output), 'utf8')

// Check the actual Pages artifact, including content available without JavaScript.
test('static portfolio includes metadata, all projects, and contact links', () => {
  assert.match(html, /<html lang="en"/)
  assert.match(html, /<title>Andrea Frolli · Software Engineer · sh1zen<\/title>/)
  assert.match(html, /rel="canonical" href="https:\/\/sh1zen.github.io\/"/)
  const structuredData = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? '')
  assert.equal(structuredData.mainEntity.name, 'Andrea Frolli')
  assert.equal((html.match(/<article class="project-card">/g) ?? []).length, 6)
  for (const project of ['wisu', 'reql', 'crossync', 'castbox', 'wp-optimizer', 'gf-multi-uploader']) {
    assert.ok(html.includes(`href="https://github.com/sh1zen/${project}"`), `Missing project: ${project}`)
  }
  assert.match(html, /href="mailto:dev.sh1zen@outlook.it"/)
  assert.ok(!html.includes('<!--app-html-->'), 'The build must complete prerendering')
})

// Resolve document links and CSS assets from the same directory uploaded by Actions.
test('document anchors and local assets resolve inside the deployable output', async () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])
  assert.equal(new Set(ids).size, ids.length, 'Document IDs must be unique')
  const assets = new Set()
  for (const [, value] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    if (value.startsWith('#')) assert.ok(ids.includes(value.slice(1)), `Broken anchor: ${value}`)
    else if (value.startsWith('/')) assets.add(value)
  }
  for (const asset of [...assets].filter((path) => path.endsWith('.css'))) {
    const css = await readFile(new URL(asset.slice(1), output), 'utf8')
    for (const [, path] of css.matchAll(/url\(["']?(\/[^\s"')]+)["']?\)/g)) assets.add(path)
  }
  assert.ok([...assets].some((path) => /^\/assets\/.+\.js$/.test(path)), 'Missing production script')
  for (const path of assets) {
    assert.ok(!path.startsWith('/src/'), `Source reference in production: ${path}`)
    assert.ok((await stat(new URL(path.slice(1), output))).isFile(), `Missing asset: ${path}`)
  }
})

test('Pages artifact contains site files and valid discovery metadata', async () => {
  const files = await readdir(output, { recursive: true })
  assert.ok(!files.some((path) => /\.(?:md|tsx?|mjs)$/.test(path)), 'Source or project documentation in public output')
  assert.ok(!files.some((path) => /(?:^|[\\/])(?:node_modules|src|scripts)(?:[\\/]|$)/.test(path)))
  assert.match(await readFile(new URL('robots.txt', output), 'utf8'), /Sitemap: https:\/\/sh1zen.github.io\/sitemap.xml/)
  assert.match(await readFile(new URL('sitemap.xml', output), 'utf8'), /<loc>https:\/\/sh1zen.github.io\/<\/loc>/)
})
