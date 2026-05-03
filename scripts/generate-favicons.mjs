import { readFile, writeFile, copyFile, mkdir, stat } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SRC = resolve(ROOT, 'app/assets/brand')
const OUT = resolve(ROOT, 'public')

const DENSITY = 384

async function logSize(label, path) {
  const s = await stat(path)
  console.log(`  ${label.padEnd(28)} ${(s.size / 1024).toFixed(1).padStart(6)} KB`)
}

async function main() {
  await mkdir(OUT, { recursive: true })
  const sourceSvgPath = resolve(SRC, 'favicon-source.svg')
  const tileSvgPath = resolve(SRC, 'favicon-tile.svg')
  const sourceSvg = await readFile(sourceSvgPath)
  const tileSvg = await readFile(tileSvgPath)

  console.log('Generating favicons →')

  // 1. favicon.svg (direct copy of transparent source)
  await copyFile(sourceSvgPath, resolve(OUT, 'favicon.svg'))
  await logSize('favicon.svg', resolve(OUT, 'favicon.svg'))

  // 2. favicon.ico — 16/32/48 multi-resolution from transparent source
  const icoSizes = [16, 32, 48]
  const icoPngs = await Promise.all(
    icoSizes.map(s =>
      sharp(sourceSvg, { density: DENSITY })
        .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer(),
    ),
  )
  const icoBuf = await pngToIco(icoPngs)
  await writeFile(resolve(OUT, 'favicon.ico'), icoBuf)
  await logSize('favicon.ico', resolve(OUT, 'favicon.ico'))

  // 3-5. PNG tiles from navy tile source
  const pngTargets = [
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
  ]
  for (const { name, size } of pngTargets) {
    const buf = await sharp(tileSvg, { density: DENSITY })
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toBuffer()
    await writeFile(resolve(OUT, name), buf)
    await logSize(name, resolve(OUT, name))
  }

  console.log('Done.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
