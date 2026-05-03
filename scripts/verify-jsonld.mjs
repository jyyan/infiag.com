// scripts/verify-jsonld.mjs
// Walks the built static site and asserts each route has the expected JSON-LD.
// Exit code 0 on success, 1 on any failure.

import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distRoot = join(__dirname, '..', '.output', 'public')

const LOCALES = [
  { dir: 'zh-TW', inLanguage: 'zh-Hant' },
  { dir: 'zh-CN', inLanguage: 'zh-Hans' },
  { dir: 'en',    inLanguage: 'en-US' },
]

// Per-route expectations: each entry is { path, expectedTypes }
// expectedTypes lists @type values that MUST appear in the page's JSON-LD graph.
const ROUTES = [
  { path: '',                  expectedTypes: ['Organization', 'WebSite', 'WebPage'] },
  { path: 'about',             expectedTypes: ['Organization', 'WebSite', 'AboutPage'] },
  { path: 'contact',           expectedTypes: ['Organization', 'WebSite', 'ContactPage'] },
  { path: 'developers',        expectedTypes: ['Organization', 'WebSite', 'WebPage'] },
  { path: 'investors',         expectedTypes: ['Organization', 'WebSite', 'WebPage'] },
  { path: 'platform',          expectedTypes: ['Organization', 'WebSite', 'WebPage', 'Service'] },
  { path: 'partners',          expectedTypes: ['Organization', 'WebSite', 'WebPage', 'Service'] },
  { path: 'solutions/golf',    expectedTypes: ['Organization', 'WebSite', 'WebPage', 'Service'] },
  { path: 'solutions/ski',     expectedTypes: ['Organization', 'WebSite', 'WebPage', 'Service'] },
  { path: 'solutions/vision',  expectedTypes: ['Organization', 'WebSite', 'WebPage', 'Service'] },
]

const failures = []
const successes = []

function extractJsonLd(html) {
  const blocks = []
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let m
  while ((m = re.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(m[1].trim()))
    } catch (err) {
      blocks.push({ __parseError: err.message, raw: m[1] })
    }
  }
  return blocks
}

function flattenGraph(parsed) {
  // nuxt-schema-org outputs a single block: { @context, @graph: [...] }
  // Or sometimes an array of blocks. Normalize to an array of nodes.
  const nodes = []
  const visit = (b) => {
    if (Array.isArray(b)) { b.forEach(visit); return }
    if (b && typeof b === 'object') {
      if (Array.isArray(b['@graph'])) { b['@graph'].forEach(visit); return }
      nodes.push(b)
    }
  }
  parsed.forEach(visit)
  return nodes
}

function check(localeDir, inLanguage, route, expectedTypes) {
  const htmlPath = join(distRoot, localeDir, route.path, 'index.html')
  const label = `${localeDir}/${route.path || '(root)'}`

  if (!existsSync(htmlPath)) {
    failures.push(`${label}: missing file at ${htmlPath}`)
    return
  }
  const html = readFileSync(htmlPath, 'utf8')
  const blocks = extractJsonLd(html)
  if (blocks.length === 0) {
    failures.push(`${label}: no <script type="application/ld+json"> block found`)
    return
  }
  const parseErrors = blocks.filter(b => b.__parseError)
  if (parseErrors.length > 0) {
    failures.push(`${label}: JSON parse error: ${parseErrors[0].__parseError}`)
    return
  }
  const nodes = flattenGraph(blocks)
  const types = new Set()
  for (const n of nodes) {
    if (typeof n['@type'] === 'string') types.add(n['@type'])
    else if (Array.isArray(n['@type'])) n['@type'].forEach(t => types.add(t))
  }
  const missing = expectedTypes.filter(t => !types.has(t))
  if (missing.length > 0) {
    failures.push(`${label}: missing @type values [${missing.join(', ')}]; saw [${[...types].join(', ')}]`)
    return
  }
  // Check inLanguage on at least one WebPage-ish node
  const pageNode = nodes.find(n => {
    const t = n['@type']
    return t === 'WebPage' || t === 'AboutPage' || t === 'ContactPage'
  })
  if (pageNode && pageNode.inLanguage !== inLanguage) {
    failures.push(`${label}: page node inLanguage = ${JSON.stringify(pageNode.inLanguage)}, expected ${inLanguage}`)
    return
  }
  successes.push(label)
}

if (!existsSync(distRoot)) {
  console.error(`✗ dist root not found: ${distRoot}`)
  console.error('  Run "nuxt generate" first.')
  process.exit(1)
}

for (const loc of LOCALES) {
  for (const route of ROUTES) {
    check(loc.dir, loc.inLanguage, route, route.expectedTypes)
  }
}

const total = LOCALES.length * ROUTES.length
console.log(`\n=== JSON-LD verification ===`)
console.log(`PASS: ${successes.length}/${total}`)
console.log(`FAIL: ${failures.length}/${total}`)
if (failures.length > 0) {
  console.log(`\nFailures:`)
  failures.forEach(f => console.log(`  ✗ ${f}`))
  process.exit(1)
}
console.log(`✓ All routes have valid JSON-LD with expected @types.`)
