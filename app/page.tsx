'use client'

import { useState, useCallback, useRef, useEffect } from 'react'

interface ImageResult {
  id: string
  dataUri: string
  base64: string
  fileName: string
  fileSize: number
  mimeType: string
  width: number
  height: number
}

export default function Home() {
  const [isDragging, setIsDragging] = useState(false)
  const [results, setResults] = useState<ImageResult[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [copyFormat, setCopyFormat] = useState<'dataUri' | 'base64' | 'css' | 'img' | 'json'>('dataUri')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Check for dark mode preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkMode(isDark)
    }
  }, [])

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const generateId = () => Math.random().toString(36).substring(2, 9)

  const handleFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'))
    
    if (fileArray.length === 0) {
      showToastMessage('Please select image files')
      return
    }

    fileArray.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUri = e.target?.result as string
        const base64 = dataUri.split(',')[1]
        
        // Get image dimensions
        const img = new Image()
        img.onload = () => {
          const newResult: ImageResult = {
            id: generateId(),
            dataUri,
            base64,
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.type,
            width: img.width,
            height: img.height
          }
          setResults(prev => [newResult, ...prev])
          setSelectedId(newResult.id)
        }
        img.src = dataUri
      }
      reader.readAsDataURL(file)
    })

    showToastMessage(`${fileArray.length} image${fileArray.length > 1 ? 's' : ''} converted`)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

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
      handleFiles(e.target.files)
    }
  }, [handleFiles])

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return

    const files: File[] = []
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile()
        if (file) files.push(file)
      }
    }
    if (files.length > 0) handleFiles(files)
  }, [handleFiles])

  useEffect(() => {
    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [handlePaste])

  const showToastMessage = (msg: string) => {
    setToastMessage(msg)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const getCopyText = (result: ImageResult): string => {
    switch (copyFormat) {
      case 'base64':
        return result.base64
      case 'css':
        return `background-image: url('${result.dataUri}');`
      case 'img':
        return `<img src="${result.dataUri}" alt="${result.fileName}" width="${result.width}" height="${result.height}" />`
      case 'json':
        return JSON.stringify({ 
          fileName: result.fileName, 
          mimeType: result.mimeType,
          width: result.width,
          height: result.height,
          base64: result.base64 
        }, null, 2)
      default:
        return result.dataUri
    }
  }

  const copyToClipboard = async (result: ImageResult) => {
    const text = getCopyText(result)
    await navigator.clipboard.writeText(text)
    const formatNames: Record<string, string> = {
      dataUri: 'Data URI',
      base64: 'Base64',
      css: 'CSS',
      img: 'HTML',
      json: 'JSON'
    }
    showToastMessage(`${formatNames[copyFormat]} copied!`)
  }

  const copyAll = async () => {
    const allData = results.map(r => ({
      fileName: r.fileName,
      dataUri: r.dataUri,
      base64: r.base64
    }))
    await navigator.clipboard.writeText(JSON.stringify(allData, null, 2))
    showToastMessage('All results copied as JSON!')
  }

  const removeResult = (id: string) => {
    setResults(prev => prev.filter(r => r.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const clearAll = () => {
    setResults([])
    setSelectedId(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const selected = results.find(r => r.id === selectedId)

  const bgClass = darkMode ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-slate-50 to-slate-100'
  const cardClass = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
  const textClass = darkMode ? 'text-slate-100' : 'text-slate-800'
  const textMutedClass = darkMode ? 'text-slate-400' : 'text-slate-500'

  return (
    <main className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Header */}
      <header className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className={`text-3xl font-bold ${textClass}`}>Image to Base64</h1>
          </div>
          <p className={textMutedClass}>Instant, private conversion. Drag, drop, paste, or click.</p>
          <p className={`text-xs ${textMutedClass} mt-1 flex items-center justify-center gap-2`}>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-xs font-mono">Ctrl</kbd>+<kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-xs font-mono">V</kbd> to paste from clipboard
          </p>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        {/* Drop Zone */}
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 ${
            darkMode ? 'border-slate-600' : 'border-slate-300'
          } ${
            isDragging
              ? 'border-blue-500 bg-blue-500/10 scale-[1.02] shadow-lg'
              : `hover:border-blue-400 ${darkMode ? 'hover:bg-blue-500/5' : 'hover:bg-blue-50/50'}`
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className={`transition-transform duration-200 ${isDragging ? 'scale-110' : ''}`}>
            <svg className={`w-20 h-20 mx-auto mb-4 ${isDragging ? 'text-blue-500' : darkMode ? 'text-slate-500' : 'text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className={`text-xl font-semibold ${textClass} mb-1`}>
            {isDragging ? 'Drop it!' : 'Drop images here'}
          </p>
          <p className={textMutedClass}>or click to browse • multiple files supported</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['PNG', 'JPG', 'GIF', 'WebP', 'SVG', 'BMP'].map(fmt => (
              <span key={fmt} className={`px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>
                {fmt}
              </span>
            ))}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-8 fade-in">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className={textMutedClass}>{results.length} result{results.length > 1 ? 's' : ''}</span>
                {results.length > 1 && (
                  <button
                    onClick={copyAll}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
                  >
                    Copy All as JSON
                  </button>
                )}
              </div>
              <button
                onClick={clearAll}
                className="px-3 py-1 text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* Format Selector */}
            <div className={`flex flex-wrap gap-2 mb-4 p-3 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
              <span className={textMutedClass}>Copy as:</span>
              {[
                { key: 'dataUri', label: 'Data URI' },
                { key: 'base64', label: 'Base64' },
                { key: 'css', label: 'CSS' },
                { key: 'img', label: 'HTML <img>' },
                { key: 'json', label: 'JSON' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setCopyFormat(key as typeof copyFormat)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    copyFormat === key
                      ? 'bg-blue-500 text-white shadow-md'
                      : darkMode
                        ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Results Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {results.map(result => (
                <div
                  key={result.id}
                  onClick={() => setSelectedId(result.id)}
                  className={`rounded-xl p-4 cursor-pointer transition-all ${
                    selectedId === result.id
                      ? 'ring-2 ring-blue-500 shadow-lg'
                      : ''
                  } ${cardClass}`}
                >
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                      <img src={result.dataUri} alt={result.fileName} className="w-full h-full object-contain" />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${textClass}`}>{result.fileName}</p>
                      <p className={`text-sm ${textMutedClass}`}>
                        {result.width} × {result.height} • {formatBytes(result.fileSize)}
                      </p>
                      <p className={`text-xs ${textMutedClass}`}>
                        {formatBytes(result.base64.length)} Base64
                      </p>
                    </div>
                    {/* Actions */}
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); copyToClipboard(result) }}
                        className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                        title="Copy"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeResult(result.id) }}
                        className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-slate-700 hover:bg-red-500/20 text-slate-400 hover:text-red-400' : 'bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-500'}`}
                        title="Remove"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Preview & Output for Selected */}
            {selected && (
              <div className={`mt-6 rounded-xl p-6 ${cardClass}`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`font-semibold ${textClass}`}>Full Preview</h2>
                  <span className={`text-sm ${textMutedClass}`}>{selected.fileName}</span>
                </div>
                <div className={`flex justify-center rounded-lg p-4 mb-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                  <img src={selected.dataUri} alt={selected.fileName} className="max-w-full max-h-80 rounded shadow-sm" />
                </div>
                <div className="relative">
                  <textarea
                    readOnly
                    value={getCopyText(selected)}
                    className={`w-full h-32 rounded-lg p-3 text-xs font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                      darkMode ? 'bg-slate-700 text-slate-200 border-slate-600' : 'bg-slate-50 text-slate-600 border-slate-200'
                    } border`}
                  />
                  <button
                    onClick={() => copyToClipboard(selected)}
                    className="absolute top-2 right-2 px-3 py-1 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: '🔒', title: '100% Private', desc: 'No uploads, all local' },
            { icon: '⚡', title: 'Instant', desc: 'Zero latency conversion' },
            { icon: '📱', title: 'Works Offline', desc: 'No server needed' },
            { icon: '🎨', title: 'Multiple Formats', desc: 'Data URI, CSS, HTML, JSON' },
          ].map((f, i) => (
            <div key={i} className={`rounded-xl p-5 text-center ${cardClass}`}>
              <div className="text-2xl mb-2">{f.icon}</div>
              <h3 className={`font-medium ${textClass}`}>{f.title}</h3>
              <p className={`text-sm ${textMutedClass}`}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* How to Use */}
        <div className={`mt-8 rounded-xl p-6 ${cardClass}`}>
          <h2 className={`font-semibold ${textClass} mb-4`}>Quick Guide</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { step: '1', title: 'Add Images', desc: 'Drag, click, or paste (Ctrl+V)' },
              { step: '2', title: 'Choose Format', desc: 'Data URI, Base64, CSS, HTML, or JSON' },
              { step: '3', title: 'Copy & Use', desc: 'Paste into your code or project' },
            ].map((item) => (
              <div key={item.step} className="flex gap-3">
                <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white bg-gradient-to-br from-blue-500 to-purple-600`}>
                  {item.step}
                </span>
                <div>
                  <p className={`font-medium ${textClass}`}>{item.title}</p>
                  <p className={`text-sm ${textMutedClass}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className={`mt-8 rounded-xl p-6 ${cardClass}`}>
          <h2 className={`font-semibold ${textClass} mb-3`}>Common Use Cases</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Email signatures', 'Inline CSS images', 'API payloads', 'Data URIs for HTML',
              'Embedding icons', 'Small image storage', 'Prototyping', 'Icon fonts'
            ].map((use, i) => (
              <span key={i} className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                {use}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-8 text-center text-sm ${textMutedClass}`}>
        <p>Free & open source. No tracking, no ads, no BS.</p>
        <p className="mt-1">
          <a href="https://github.com/nutshot2000/-Image-to-Base64-Converter" target="_blank" rel="noopener" className="hover:text-blue-500 transition-colors">
            View on GitHub →
          </a>
        </p>
        <nav className="mt-4 flex flex-wrap justify-center gap-4">
          <a href="/about" className="hover:text-blue-500 transition-colors">About</a>
          <a href="/contact" className="hover:text-blue-500 transition-colors">Contact</a>
          <a href="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-blue-500 transition-colors">Terms of Service</a>
        </nav>
        <p className="mt-4 text-xs opacity-75">© 2026 img64.dev. All rights reserved.</p>
      </footer>

      {/* Toast */}
      {showToast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-medium shadow-lg z-50 animate-bounce ${darkMode ? 'bg-slate-100 text-slate-800' : 'bg-slate-800 text-white'}`}>
          {toastMessage}
        </div>
      )}

      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}