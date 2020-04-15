import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { URL } from 'node:url'
import test from 'node:test'

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
const hero = html.match(/<section class="hero"[\s\S]*?<\/section>/)?.[0]

// Exercise the shipped, prerendered document so the hero also works without JavaScript.
test('personal hero exposes its identity, content, and working link destinations', () => {
  assert.ok(hero, 'The production document must include the hero')
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1)
  const heading = hero.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g, '')
  assert.equal(heading, 'sh1zen.')
  for (const text of ['EXPLORE / BUILD / IMPROVE', 'Software Engineer', 'Building useful things. Thinking in systems.', 'I follow curiosity and write the code.', 'Turin, Italy', 'OPEN SOURCE · SYSTEMS · AI']) {
    assert.ok(hero.includes(text), `Missing hero content: ${text}`)
  }
  assert.match(hero, /Curiosity<br\s*\/?>(?:builds better)<br\s*\/?>(?:software\.)/)
  assert.match(hero, /href="#projects"[^>]*>Explore Projects/)
  assert.match(hero, /href="https:\/\/github.com\/sh1zen"[^>]*>[\s\S]*?GitHub Profile/)
  for (const id of ['projects', 'about', 'expertise', 'contact']) {
    assert.ok(html.includes(`id="${id}"`), `Missing navigation destination: ${id}`)
  }
})

// Verify both image candidates reach the deployable output within a small transfer budget.
test('decorative panorama ships locally with responsive candidates and reserved dimensions', async () => {
  assert.match(hero, /class="hero-landscape" aria-hidden="true"/)
  assert.match(hero, /alt=""/)
  assert.match(hero, /width="1536" height="1024"/)
  assert.match(hero, /fetchPriority="high"/i)
  assert.match(hero, /srcSet="\/images\/hero-mountains-mobile.webp 768w, \/images\/hero-mountains.webp 1536w"/i)
  for (const [name, budget] of [['hero-mountains.webp', 60_000], ['hero-mountains-mobile.webp', 20_000]]) {
    const url = new URL(`../dist/images/${name}`, import.meta.url)
    const image = await readFile(url)
    assert.equal(image.toString('ascii', 0, 4), 'RIFF')
    assert.equal(image.toString('ascii', 8, 12), 'WEBP')
    assert.ok((await stat(url)).size <= budget, `${name} exceeds its transfer budget`)
  }
})
