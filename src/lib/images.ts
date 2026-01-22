import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

export interface ImageOptimizationOptions {
  quality?:  number
  maxWidth?: number
  maxHeight?: number
  format?: 'webp' | 'avif' | 'jpeg' | 'png'
  outputDir?: string
}

export async function optimizeImage(
  inputPath: string,
  options:  ImageOptimizationOptions = {}
) {
  const {
    quality = 80,
    maxWidth = 2000,
    maxHeight = 2000,
    format = 'webp',
    outputDir,
  } = options

  try {
    const imageBuffer = await fs.readFile(inputPath)
    const fileName = path.parse(inputPath).name
    const outputPath = outputDir
      ? path.join(outputDir, `${fileName}.${format}`)
      : path.join(path.dirname(inputPath), `${fileName}.${format}`)

    let sharpInstance = sharp(imageBuffer)

    // Resize if needed
    const metadata = await sharpInstance.metadata()
    if (
      metadata.width &&
      metadata.height &&
      (metadata.width > maxWidth || metadata.height > maxHeight)
    ) {
      sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
    }

    // Convert and optimize
    switch (format) {
      case 'webp':
        await sharpInstance.webp({ quality }).toFile(outputPath)
        break
      case 'avif':
        await sharpInstance. avif({ quality }).toFile(outputPath)
        break
      case 'jpeg':
        await sharpInstance.jpeg({ quality, progressive: true }).toFile(outputPath)
        break
      case 'png':
        await sharpInstance.png({ quality, progressive: true }).toFile(outputPath)
        break
    }

    const inputStats = await fs.stat(inputPath)
    const outputStats = await fs.stat(outputPath)
    const savedBytes = inputStats.size - outputStats.size
    const savedPercent = ((savedBytes / inputStats.size) * 100).toFixed(2)

    return {
      inputPath,
      outputPath,
      inputSize: inputStats.size,
      outputSize: outputStats.size,
      savedBytes,
      savedPercent:  `${savedPercent}%`,
    }
  } catch (error) {
    console.error(`Error optimizing image ${inputPath}: `, error)
    throw error
  }
}

export async function optimizeImagesInDirectory(
  directoryPath: string,
  options: ImageOptimizationOptions = {}
) {
  const files = await fs.readdir(directoryPath)
  const imageExtensions = ['.png', '.jpg', '.jpeg']
  
  const imageFiles = files. filter((file) =>
    imageExtensions.includes(path.extname(file).toLowerCase())
  )

  const results = []
  for (const file of imageFiles) {
    const fullPath = path. join(directoryPath, file)
    try {
      const result = await optimizeImage(fullPath, options)
      results.push(result)
    } catch (error) {
      console.error(`Failed to optimize ${file}:`, error)
    }
  }

  return results
}