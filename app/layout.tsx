import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Image to Base64 Converter — Instant & Free',
  description: 'Convert images to Base64 instantly. Drag & drop or paste. No upload, no ads, works offline. Free online Base64 image encoder.',
  keywords: 'image to base64, base64 encoder, image encoder, convert image to base64, base64 image, data uri',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}