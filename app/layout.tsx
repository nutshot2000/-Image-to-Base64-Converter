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
    url: 'https://img64.dev',
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Image to Base64 Converter',
    description: 'Convert images to Base64 instantly. 100% private, works offline. Free online Base64 image encoder.',
    url: 'https://img64.dev',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Convert images to Base64',
      'Drag and drop support',
      'Paste from clipboard',
      'Multiple output formats',
      'Works offline',
      'No server upload',
    ],
  }

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://img64.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-E4YJGDJFS7"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-E4YJGDJFS7');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}