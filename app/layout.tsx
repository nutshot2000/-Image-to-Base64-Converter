import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Image to Base64 Converter — Free & Instant | No Upload',
  description: 'Convert images to Base64 instantly. Drag, drop, or paste. 100% private — no uploads, works offline. Free online Base64 image encoder for developers.',
  keywords: 'image to base64, base64 encoder, image encoder, convert image to base64, base64 image, data uri, base64 converter, image to data uri, online base64 tool',
  authors: [{ name: 'Image to Base64' }],
  openGraph: {
    title: 'Image to Base64 Converter — Free & Instant',
    description: 'Convert images to Base64 instantly. 100% private, works offline. No uploads needed.',
    type: 'website',
    url: 'https://image-to-base64-converter.vercel.app',
    siteName: 'Image to Base64',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image to Base64 Converter — Free & Instant',
    description: 'Convert images to Base64 instantly. 100% private, works offline.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://image-to-base64-converter.vercel.app" />
      </head>
      <body>{children}</body>
    </html>
  )
}