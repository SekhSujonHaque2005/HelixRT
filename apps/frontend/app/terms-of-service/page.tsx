import { Header } from "@/components/ui/header-3";

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-serif flex flex-col relative transition-colors duration-300">
            <Header />

            <main className="flex-1 max-w-4xl mx-auto px-6 py-24 w-full">
                <h1 className="text-4xl md:text-5xl font-black mb-4">Terms of Service</h1>
                <p className="text-slate-500 mb-12">Last Updated: October 1, 2026</p>

                <div className="prose prose-lg dark:prose-invert font-serif text-slate-700 dark:text-slate-300 max-w-none">
                    <p className="lead text-xl mb-8">
                        These Terms of Service ("Terms") govern your access to and use of the HelixRT open-source runtime, the telemetry gateway, and our enterprise dashboard services (collectively, the "Services"). By utilizing our Services, you agree to be bound by these Terms.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900 dark:text-white">1. Software License and Restrictions</h2>
                    <p>
                        The HelixRT C++ Node framework and runtime scheduler are released under the MIT License. You may freely study, modify, and distribute the C++ runtime. However, the proprietary visualization Dashboard available in our Enterprise Tier is licensed solely for your internal business operations. You shall not reverse-engineer, decompile, or otherwise attempt to derive the source code of the proprietary dashboard components without express written permission.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900 dark:text-white">2. Telemetry Overhead and SLA</h2>
                    <p>
                        HelixRT is designed as a zero-cost abstraction observability pipeline. However, streaming millions of WebSocket frames naturally consumes network bandwidth and Gateway CPU cycles. We do not guarantee zero latency under catastrophic load. As an open-source user, the Services are provided "AS IS". Enterprise customers are subject to the specific SLA guarantees detailed in their respective Master Services Agreements (MSA).
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900 dark:text-white">3. Acceptable Use Policy</h2>
                    <p>
                        You agree not to misuse the Services. Specifically, you may not:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>Intentionally spam the gRPC gateway or WebSocket nodes in an attempt to perform a Denial of Service.</li>
                        <li>Inject malicious packets into the telemetry stream to spoof scheduler states or arbitrary memory bounds.</li>
                        <li>Utilize the system to monitor unconsenting third-party systems or bypass DRM constraints.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900 dark:text-white">4. Limitation of Liability</h2>
                    <p>
                        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL HELIXRT SYSTEMS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE, THIS SERVICE.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900 dark:text-white">5. Governing Law</h2>
                    <p>
                        These Terms shall be governed by the laws of the State of California, United States, without respect to its conflict of laws principles. We reserve the right to modify these Terms at any time. Changes will be communicated via our Engineering Blog and GitHub release notes.
                    </p>
                </div>
            </main>

            <footer className="py-12 mt-12 text-center text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800">
                © 2026 HelixRT Systems. All rights reserved.
            </footer>
        </div>
    );
}
