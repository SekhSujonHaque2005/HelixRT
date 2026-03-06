export function Logo({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="helix-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="helix-grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
            </defs>

            {/* Connection lines */}
            <line x1="33" y1="28" x2="87" y2="28" stroke="#3b82f6" strokeWidth="4" strokeOpacity="0.3" strokeLinecap="round" />
            <line x1="40" y1="44" x2="80" y2="44" stroke="#3b82f6" strokeWidth="4" strokeOpacity="0.6" strokeLinecap="round" />
            <line x1="56" y1="60" x2="64" y2="60" stroke="#3b82f6" strokeWidth="4" strokeOpacity="0.9" strokeLinecap="round" />
            <line x1="40" y1="76" x2="80" y2="76" stroke="#3b82f6" strokeWidth="4" strokeOpacity="0.6" strokeLinecap="round" />
            <line x1="33" y1="92" x2="87" y2="92" stroke="#3b82f6" strokeWidth="4" strokeOpacity="0.3" strokeLinecap="round" />

            {/* Left Helix */}
            <path
                d="M40 10 C15 35, 15 55, 40 60 C65 65, 65 85, 40 110"
                stroke="url(#helix-grad1)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
            />

            {/* Right Helix */}
            <path
                d="M80 10 C105 35, 105 55, 80 60 C55 65, 55 85, 80 110"
                stroke="url(#helix-grad2)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
            />
        </svg>
    );
}
