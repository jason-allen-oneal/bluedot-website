import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src:  string
  fallbackSrc?: string
  lowQualityPlaceholder?: string
}

export default function OptimizedImage({
  src,
  fallbackSrc,
  lowQualityPlaceholder,
  alt,
  ... props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  // Try WebP first, fallback to original
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp')

  return (
    <div className="relative">
      {isLoading && lowQualityPlaceholder && (
        <Image
          src={lowQualityPlaceholder}
          alt={alt}
          {... props}
          className={`absolute inset-0 blur-sm ${props.className || ''}`}
          priority={false}
        />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        {... props}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          if (imgSrc === webpSrc && fallbackSrc) {
            setImgSrc(fallbackSrc)
          } else if (fallbackSrc) {
            setImgSrc(fallbackSrc)
          }
        }}
      />
    </div>
  )
}