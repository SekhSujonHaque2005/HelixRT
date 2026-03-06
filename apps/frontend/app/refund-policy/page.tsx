import { Header } from "@/components/ui/header-3";

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-50 font-serif flex flex-col relative transition-colors duration-300">
            <Header />

            <main className="flex-1 max-w-4xl mx-auto px-6 py-24 w-full">
                <h1 className="text-4xl md:text-5xl font-black mb-4">Refund Policy</h1>
                <p className="text-slate-500 mb-12">Effective Date: October 1, 2026</p>

                <div className="prose prose-lg dark:prose-invert font-serif text-slate-700 dark:text-slate-300 max-w-none">
                    <p className="lead text-xl mb-8">
                        HelixRT relies on an open-source core framework (MIT Licensed) combined with enterprise, closed-source observability add-ons. You will never be charged for the open-source client and gateway. This refund policy strictly applies to the HelixRT Managed Cloud and Enterprise Dashboard subscriptions.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900 dark:text-white">1. Subscription Cancellations</h2>
                    <p>
                        You may cancel your Enterprise Dashboard subscription at any time from the Billing page within your account settings. Upon cancellation, your account will remain active until the end of the current billing cycle. We do not prorate cancellations for mid-cycle terminations.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900 dark:text-white">2. 14-Day Money Back Guarantee</h2>
                    <p>
                        For newly initiated paid deployments, if you evaluate the observability tools and find they do not meet the low-latency requirements of your proprietary C++ architecture within the first 14 days of purchase, please contact <code>enterprise-support@helixrt.com</code>. We will initiate a full, no-questions-asked refund of your initial payment.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>The 14-day guarantee is only valid for your first subscription transaction.</li>
                        <li>Refunds may take 5–10 business days to appear on your original payment method.</li>
                        <li>Annual contract renewals are entirely excluded from this guarantee unless expressly stipulated otherwise in your MSA.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900 dark:text-white">3. SLA Failures and Credits</h2>
                    <p>
                        If the Managed Cloud aggregation PostgreSQL database drops below the 99.99% multi-region uptime SLA threshold for any given calendar month, Enterprise users are eligible for SLA Service Credits rather than direct cash refunds.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900 dark:text-white">4. Abuse and Terminations</h2>
                    <p>
                        Accounts terminated by HelixRT due to severe violations of the Acceptable Use Policy (e.g., intentional denial-of-service stress testing against the multi-tenant SaaS grid) are entirely ineligible for refunds or prorated returns.
                    </p>
                </div>
            </main>

            <footer className="py-12 mt-12 text-center text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800">
                © 2026 HelixRT Systems. All rights reserved.
            </footer>
        </div>
    );
}
