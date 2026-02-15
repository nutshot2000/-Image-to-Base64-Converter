'use client'

import { useState, useCallback, useRef, useEffect } from 'react'

export default function Home() {
  const [isDragging, setIsDragging] = useState(false)
  const [result, setResult] = useState<{
    dataUri: string
    base64: string
    fileName: string
    fileSize: string
    base64Length: number
  } | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setToastMessage('Please select an image file')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUri = e.target?.result as string
      const base64 = dataUri.split(',')[1]

      setResult({
        dataUri,
        base64,
        fileName: file.name,
        fileSize: formatBytes(file.size),
        base64Length: base64.length
      })
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [handleFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }, [handleFile])

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile()
        if (file) handleFile(file)
        break
      }
    }
  }, [handleFile])

  // Paste event listener
  useEffect(() => {
    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [handlePaste])

  const copyToClipboard = async (text: string, message: string) => {
    await navigator.clipboard.writeText(text)
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const reset = () => {
    setResult(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Image to Base64</h1>
          <p className="text-slate-500">Convert images instantly. Drag, drop, or paste. No upload needed.</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 pb-12">
        {/* Drop Zone */}
        <div
          className={`drop-zone border-2 border-dashed rounded-2xl bg-white p-12 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-50 scale-[1.01]'
              : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/30'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-lg font-medium text-slate-600 mb-1">Drop an image here</p>
          <p className="text-slate-400 text-sm mb-3">or click to select • or paste from clipboard</p>
          <span className="inline-block px-4 py-2 bg-slate-100 text-slate-500 rounded-lg text-sm">
            PNG, JPG, GIF, WebP, SVG
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Result Section */}
        {result && (
          <div className="fade-in mt-8">
            {/* Image Preview */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-700">Preview</h2>
                <span className="text-sm text-slate-400">{result.fileName} • {result.fileSize}</span>
              </div>
              <div className="flex justify-center bg-slate-50 rounded-lg p-4">
                <img src={result.dataUri} alt="Preview" className="max-w-full max-h-64 rounded shadow-sm" />
              </div>
            </div>

            {/* Base64 Output */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-4">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h2 className="font-semibold text-slate-700">Base64 Output</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(result.dataUri, 'Data URI copied!')}
                    className="copy-btn px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    Copy Data URI
                  </button>
                  <button
                    onClick={() => copyToClipboard(result.base64, 'Base64 copied!')}
                    className="copy-btn px-4 py-2 bg-slate-600 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
                  >
                    Copy Base64 Only
                  </button>
                </div>
              </div>
              <textarea
                readOnly
                value={result.dataUri}
                className="w-full h-32 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs font-mono text-slate-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <p className="text-xs text-slate-400 mt-2">
                Base64 length: {result.base64Length.toLocaleString()} characters ({formatBytes(result.base64Length)})
              </p>
            </div>

            {/* Convert Another */}
            <div className="text-center">
              <button
                onClick={reset}
                className="px-6 py-3 bg-slate-100 text-slate-600 rounded-lg font-medium hover:bg-slate-200 transition-colors"
              >
                Convert Another Image
              </button>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 text-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-medium text-slate-700 mb-1">100% Private</h3>
            <p className="text-sm text-slate-400">Nothing uploads. All processing happens in your browser.</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-medium text-slate-700 mb-1">Instant</h3>
            <p className="text-sm text-slate-400">No waiting. Convert images in milliseconds.</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="font-medium text-slate-700 mb-1">Works Offline</h3>
            <p className="text-sm text-slate-400">No server needed. Use it anywhere, anytime.</p>
          </div>
        </div>

        {/* How to Use */}
        <div className="mt-12 bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="font-semibold text-slate-700 mb-4">How to Use</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <p><strong>Drag & drop</strong> an image onto the drop zone, or click to select a file, or <strong>paste</strong> from clipboard (Ctrl/Cmd+V)</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <p>The image converts instantly — no buttons to click</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <p>Copy the result as a <strong>Data URI</strong> (ready to use in HTML/CSS) or <strong>Base64 only</strong> (for APIs)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-slate-400">
        <p>Free and open. No ads, no tracking, no BS.</p>
      </footer>

      {/* Toast */}
      {showToast && (
        <div className="toast fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium shadow-lg z-50">
          {toastMessage}
        </div>
      )}
    </main>
  )
}