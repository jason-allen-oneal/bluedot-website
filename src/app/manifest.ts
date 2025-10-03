import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'bluedot.it.com - Jason O\'Neal',
    short_name: 'bluedot.it',
    description: 'Expert in cybersecurity, programming, and technology',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#00ffff',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
