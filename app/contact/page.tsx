export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-8">Contact</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            We'd love to hear from you. Reach out with questions, feedback, or suggestions.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">Email</h2>
          <ul className="list-none text-slate-600 dark:text-slate-400 mt-2 space-y-2">
            <li><strong>General Inquiries:</strong> <a href="mailto:hello@img64.dev" className="text-blue-500 hover:underline">hello@img64.dev</a></li>
            <li><strong>Support:</strong> <a href="mailto:support@img64.dev" className="text-blue-500 hover:underline">support@img64.dev</a></li>
            <li><strong>Privacy:</strong> <a href="mailto:privacy@img64.dev" className="text-blue-500 hover:underline">privacy@img64.dev</a></li>
            <li><strong>Legal:</strong> <a href="mailto:legal@img64.dev" className="text-blue-500 hover:underline">legal@img64.dev</a></li>
          </ul>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">GitHub</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Found a bug or want to request a feature? Open an issue on our <a href="https://github.com/nutshot2000/-Image-to-Base64-Converter" className="text-blue-500 hover:underline" target="_blank" rel="noopener">GitHub repository</a>.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">Response Time</h2>
          <p className="text-slate-600 dark:text-slate-400">
            We aim to respond to all inquiries within 48 hours. For urgent matters, please include "URGENT" in your email subject line.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <a href="/" className="text-blue-500 hover:underline">← Back to img64.dev</a>
        </div>
      </div>
    </main>
  )
}