export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-8">About img64.dev</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            <strong>img64.dev</strong> is a free, privacy-focused tool for converting images to Base64 format. Built for developers, by developers.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">Why We Built This</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Every time I needed to convert an image to Base64, I'd search for an online tool and wonder: <em>"Is this site stealing my files?"</em>
          </p>
          <p className="text-slate-600 dark:text-slate-400 mt-4">
            Most tools require uploads to their servers. Some are covered in ads. Many are slow or bloated with unnecessary features.
          </p>
          <p className="text-slate-600 dark:text-slate-400 mt-4">
            So I built img64.dev with a simple principle: <strong>your images never leave your browser</strong>.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">How It Works</h2>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mt-2 space-y-2">
            <li><strong>100% Client-Side</strong> — All conversion happens in your browser using JavaScript</li>
            <li><strong>No Server Uploads</strong> — Your images never touch our servers</li>
            <li><strong>Works Offline</strong> — Once loaded, the tool works without internet</li>
            <li><strong>Multiple Formats</strong> — Data URI, Base64, CSS, HTML, JSON</li>
            <li><strong>Dark Mode</strong> — Easy on the eyes</li>
          </ul>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">Who Is This For?</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Web developers, email designers, API developers, and anyone who needs to embed images as text. Common use cases include:
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mt-2 space-y-2">
            <li>Inline CSS background images</li>
            <li>Email signature images</li>
            <li>API payloads</li>
            <li>Prototyping and demos</li>
            <li>Embedding small images in HTML/CSS</li>
          </ul>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">The Tech Stack</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Built with modern web technologies:
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mt-2 space-y-2">
            <li><strong>Next.js 14</strong> — React framework</li>
            <li><strong>Tailwind CSS</strong> — Styling</li>
            <li><strong>TypeScript</strong> — Type safety</li>
            <li><strong>Vercel</strong> — Hosting</li>
          </ul>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">Open Source</h2>
          <p className="text-slate-600 dark:text-slate-400">
            This project is open source. View the code on <a href="https://github.com/nutshot2000/-Image-to-Base64-Converter" className="text-blue-500 hover:underline" target="_blank" rel="noopener">GitHub</a>.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">Support</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Found a bug or have a feature request? Open an issue on GitHub or reach out at <a href="mailto:support@img64.dev" className="text-blue-500 hover:underline">support@img64.dev</a>.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <a href="/" className="text-blue-500 hover:underline">← Back to img64.dev</a>
        </div>
      </div>
    </main>
  )
}