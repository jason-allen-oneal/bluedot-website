import { optimizeImagesInDirectory } from '../src/lib/images'
import path from 'path'

async function main() {
  const publicDir = path.join(process.cwd(), 'public')
  
  console.log('🖼️  Starting image optimization...\n')

  // Optimize main images
  console.log('Optimizing root images...')
  const rootResults = await optimizeImagesInDirectory(publicDir, {
    quality: 85,
    format: 'webp',
    maxWidth: 2000,
  })

  rootResults.forEach((result) => {
    console.log(`✓ ${path.basename(result.inputPath)}`)
    console.log(`  ${formatBytes(result.inputSize)} → ${formatBytes(result.outputSize)}`)
    console.log(`  Saved: ${result.savedPercent}\n`)
  })

  // Optimize background images (lower quality for large files)
  console.log('Optimizing backgrounds...')
  const backgrounds = ['background-light.png', 'background-dark.png']
  for (const bg of backgrounds) {
    const bgPath = path.join(publicDir, bg)
    try {
      const { optimizeImage } = await import('../src/lib/images')
      const result = await optimizeImage(bgPath, {
        quality: 75,
        format: 'webp',
        maxWidth: 1920,
      })
      console.log(`✓ ${bg}`)
      console.log(`  ${formatBytes(result.inputSize)} → ${formatBytes(result.outputSize)}`)
      console.log(`  Saved: ${result.savedPercent}\n`)
    } catch (error) {
      console.error(`Failed to optimize ${bg}`)
    }
  }

  console.log('✅ Image optimization complete!')
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

main().catch(console.error)