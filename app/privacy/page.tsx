export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-slate-600 dark:text-slate-400">
            <strong>Last updated:</strong> February 15, 2026
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">How We Handle Your Data</h2>
          <p className="text-slate-600 dark:text-slate-400">
            <strong>img64.dev processes everything locally in your browser.</strong> We do not upload, store, or transmit your images to any server. All image-to-Base64 conversion happens entirely on your device.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">Information We Collect</h2>
          <p className="text-slate-600 dark:text-slate-400">
            We may collect anonymous usage data through:
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mt-2 space-y-2">
            <li>Google Analytics (anonymized IP addresses)</li>
            <li>Google AdSense (for advertising purposes)</li>
          </ul>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">Cookies</h2>
          <p className="text-slate-600 dark:text-slate-400">
            We use cookies and similar technologies for:
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mt-2 space-y-2">
            <li>Remembering your preferences (e.g., dark mode)</li>
            <li>Analytics to understand how our site is used</li>
            <li>Displaying relevant advertisements</li>
          </ul>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">Third-Party Services</h2>
          <p className="text-slate-600 dark:text-slate-400">
            We use the following third-party services:
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mt-2 space-y-2">
            <li><strong>Google Analytics</strong> - Website analytics</li>
            <li><strong>Google AdSense</strong> - Advertising</li>
            <li><strong>Vercel</strong> - Website hosting</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-400 mt-4">
            These services may collect data according to their own privacy policies.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">Your Rights</h2>
          <p className="text-slate-600 dark:text-slate-400">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mt-2 space-y-2">
            <li>Access the data we hold about you</li>
            <li>Request deletion of your data</li>
            <li>Opt out of analytics and advertising cookies</li>
            <li>Contact us with privacy concerns</li>
          </ul>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">Contact</h2>
          <p className="text-slate-600 dark:text-slate-400">
            For privacy-related questions, contact us at: <a href="mailto:privacy@img64.dev" className="text-blue-500 hover:underline">privacy@img64.dev</a>
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">Changes to This Policy</h2>
          <p className="text-slate-600 dark:text-slate-400">
            We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <a href="/" className="text-blue-500 hover:underline">← Back to img64.dev</a>
        </div>
      </div>
    </main>
  )
}