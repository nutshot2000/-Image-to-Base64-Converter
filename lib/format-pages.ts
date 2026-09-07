import type { Metadata } from 'next'

export type FormatPage = {
  label: string
  slug: string
  heading: string
  title: string
  description: string
  intro: string
  useCase: string
  privacyNote: string
}

const formatPages = {
  png: {
    label: 'PNG', slug: 'png-to-base64',
    heading: 'Convert PNG to Base64 online',
    title: 'PNG to Base64 Converter — Free, Private & Instant',
    description: 'Convert PNG images to Base64, Data URI, CSS, HTML, or JSON instantly. Processing stays in your browser with no upload.',
    intro: 'Use this PNG to Base64 converter to turn a PNG into a text string you can embed in HTML, CSS, JSON, or an API payload. Add a file above and copy the output in the format your project needs.',
    useCase: 'PNG works especially well for small transparent icons, logos, and interface assets. Base64 can make those assets portable when a single self-contained HTML file or JSON payload is more useful than a separate image request.',
    privacyNote: 'Your PNG is read and encoded in this browser. img64 does not upload, store, or inspect the file.'
  },
  jpg: {
    label: 'JPG', slug: 'jpg-to-base64',
    heading: 'Convert JPG to Base64 online',
    title: 'JPG to Base64 Converter — Free, Private & Instant',
    description: 'Convert JPG and JPEG images to Base64, Data URI, CSS, HTML, or JSON instantly. No image upload required.',
    intro: 'Convert JPG or JPEG files into Base64 strings for HTML, CSS, JSON, email templates, and API requests. The converter can optionally compress an image before creating the output.',
    useCase: 'JPG is a practical choice for photographs and larger images. Use Base64 selectively for small images, prototypes, email assets, or APIs that expect an image as text.',
    privacyNote: 'The JPG is converted locally on your device. No image file is sent to img64 servers.'
  },
  webp: {
    label: 'WebP', slug: 'webp-to-base64',
    heading: 'Convert WebP to Base64 online',
    title: 'WebP to Base64 Converter — Free, Private & Instant',
    description: 'Convert WebP images to Base64, Data URI, CSS, HTML, or JSON instantly in your browser. Private, fast, and free.',
    intro: 'Turn WebP images into Base64 text for web projects, JSON payloads, and self-contained prototypes. Drop a WebP file above, then copy a Data URI, CSS rule, HTML image tag, or plain Base64 output.',
    useCase: 'WebP is often used for efficient web graphics. Encoding a small WebP asset can be useful when portability matters more than keeping the image as a separate network resource.',
    privacyNote: 'WebP conversion happens entirely in your browser, so the source image remains on your device.'
  },
  svg: {
    label: 'SVG', slug: 'svg-to-base64',
    heading: 'Convert SVG to Base64 online',
    title: 'SVG to Base64 Converter — Free, Private & Instant',
    description: 'Convert SVG files to Base64, Data URI, CSS, HTML, or JSON instantly. Encode SVG locally with no upload.',
    intro: 'Use this SVG to Base64 converter when you need an inline icon, logo, or vector graphic in a CSS rule, HTML document, JSON field, or API request. Choose the output format and copy it directly.',
    useCase: 'SVG is ideal for crisp icons and logos at any size. A Base64 Data URI can keep a small vector asset alongside the code that uses it.',
    privacyNote: 'The SVG is encoded locally in the browser. img64 never uploads or stores the vector file.'
  },
  gif: {
    label: 'GIF', slug: 'gif-to-base64',
    heading: 'Convert GIF to Base64 online',
    title: 'GIF to Base64 Converter — Free, Private & Instant',
    description: 'Convert GIF images to Base64, Data URI, CSS, HTML, or JSON instantly in your browser. No upload required.',
    intro: 'Convert a GIF to a Base64 string for HTML, CSS, JSON, or an API payload. Upload a GIF above, select the output you need, and copy the encoded result immediately.',
    useCase: 'Base64-encoded GIFs can be helpful for small animated assets in demos, prototypes, or self-contained documents. Keep an eye on output size because Base64 increases file size.',
    privacyNote: 'The GIF remains on your device throughout conversion. img64 processes it locally in your browser.'
  },
} satisfies Record<string, FormatPage>

export function getFormatPage(key: keyof typeof formatPages) {
  return formatPages[key]
}

export function formatMetadata(page: FormatPage): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: { title: page.title, description: page.description, url: `/${page.slug}` },
  }
}
