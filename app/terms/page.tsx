export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-slate-600 dark:text-slate-400">
            <strong>Last updated:</strong> February 15, 2026
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-slate-600 dark:text-slate-400">
            By accessing and using img64.dev, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">2. Description of Service</h2>
          <p className="text-slate-600 dark:text-slate-400">
            img64.dev provides a free online tool for converting images to Base64 format. All processing occurs locally in your browser. We do not store or transmit your images to any server.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">3. Use of Service</h2>
          <p className="text-slate-600 dark:text-slate-400">
            You agree to use this service only for lawful purposes. You may not:
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mt-2 space-y-2">
            <li>Use the service for any illegal or unauthorized purpose</li>
            <li>Attempt to interfere with or disrupt the service</li>
            <li>Use automated systems to access the service in a manner that sends more requests than a human can reasonably produce</li>
          </ul>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">4. Intellectual Property</h2>
          <p className="text-slate-600 dark:text-slate-400">
            The service and its original content, features, and functionality are owned by img64.dev and are protected by international copyright, trademark, and other intellectual property laws.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">5. No Warranty</h2>
          <p className="text-slate-600 dark:text-slate-400">
            This service is provided "as is" without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">6. Limitation of Liability</h2>
          <p className="text-slate-600 dark:text-slate-400">
            In no event shall img64.dev be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">7. Third-Party Advertisements</h2>
          <p className="text-slate-600 dark:text-slate-400">
            This service may display advertisements from third-party providers. These providers may use cookies to serve ads based on your prior visits to this or other websites.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">8. Changes to Terms</h2>
          <p className="text-slate-600 dark:text-slate-400">
            We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on this page. Your continued use of the service after changes constitutes acceptance of the new terms.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">9. Governing Law</h2>
          <p className="text-slate-600 dark:text-slate-400">
            These terms shall be governed by the laws of the United Kingdom, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">10. Contact</h2>
          <p className="text-slate-600 dark:text-slate-400">
            For questions about these terms, contact us at: <a href="mailto:legal@img64.dev" className="text-blue-500 hover:underline">legal@img64.dev</a>
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <a href="/" className="text-blue-500 hover:underline">← Back to img64.dev</a>
        </div>
      </div>
    </main>
  )
}