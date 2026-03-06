import { Header } from "@/components/ui/header-3";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-50 font-serif flex flex-col relative transition-colors duration-300">
            <Header />

            <main className="flex-1 max-w-4xl mx-auto px-6 py-24 w-full">
                <h1 className="text-4xl md:text-5xl font-black mb-4">Privacy Policy</h1>
                <p className="text-slate-500 mb-12">Effective Date: October 1, 2026</p>

                <div className="prose prose-lg dark:prose-invert font-serif text-slate-700 dark:text-slate-300 max-w-none">
                    <p className="lead text-xl mb-8">
                        At HelixRT Systems, we believe that high-performance observability should never compromise the privacy of your users or the security of your proprietary data. This Privacy Policy explains how we collect, use, and handle information when you interact with our Services.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900 dark:text-white">1. Data Collected by the Gateway</h2>
                    <p>
                        The HelixRT open-source telemetry gateway processes raw atomic integer data (e.g., thread queue depths, memory addresses, CPU ticks). By default, <strong>all of this data remains completely localized</strong> within your own virtual private cloud (VPC) or on-premise hardware. The client dashboard connects directly to your own WebSocket port.
                    </p>
                    <p>
                        We do not receive, store, or process your runtime telemetry logs unless you explicitly configure the Gateway to forward metrics to the HelixRT Managed Cloud for historical PostgreSQL aggregation.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900 dark:text-white">2. Information We Collect Automatically</h2>
                    <p>
                        When utilizing our public website (helixrt.com), we collect standard diagnostic and analytical metadata:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li><strong>Log Data:</strong> Diagnostic crash reports and API error rates on our public endpoints.</li>
                        <li><strong>Device Information:</strong> Browser type, operating system, and screen resolution to optimize the Next.js frontend rendering canvas.</li>
                        <li><strong>Cookies:</strong> Small tracking pixels for authenticating Enterprise Dashboard portal sessions and maintaining local dark/light mode preferences.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900 dark:text-white">3. Third-Party Integrations</h2>
                    <p>
                        Our infrastructure leverages secure third-party vendors for specific functionalities, such as Stripe for enterprise billing and Auth0 for Single Sign-On (SSO). We solely share absolute minimum necessary data (such as an email address) to facilitate these explicit transactions. HelixRT will never sell your personal information or your runtime metrics to data brokers.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900 dark:text-white">4. GDPR and CCPA Compliance</h2>
                    <p>
                        If you reside within the European Economic Area (EEA) or California, you possess the right to access, rectify, or erase any personal data we hold. To issue a Data Subject Access Request (DSAR) or request full deletion of your Enterprise account metrics, email <code>privacy@helixrt.com</code>. We comply with all requests within 30 days.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900 dark:text-white">5. Security Contingencies</h2>
                    <p>
                        If a security breach compromises your Managed Cloud metrics, we will formally alert all affected Enterprise administrators within 72 hours alongside a detailed incident post-mortem on our Engineering Blog.
                    </p>
                </div>
            </main>

            <footer className="py-12 mt-12 text-center text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800">
                © 2026 HelixRT Systems. All rights reserved.
            </footer>
        </div>
    );
}
