import React from "react";

const AILogoN: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg
      className={`w-24 h-24 ${className}`}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A00E0" />
          <stop offset="100%" stopColor="#8E2DE2" />
        </linearGradient>
      </defs>

      {/* Main 'N' shape */}
      <path
        d="M20 80V20L50 80V20L80 80V20"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Circuit lines */}
      <path
        d="M30 70H70M40 50H60M35 30H65"
        fill="none"
        stroke="#8E2DE2"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Animated circles */}
      <circle className="animate-ping" cx="20" cy="20" r="3" fill="#4A00E0" />
      <circle className="animate-ping" cx="50" cy="50" r="3" fill="#8E2DE2">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle className="animate-ping" cx="80" cy="80" r="3" fill="#4A00E0" />
    </svg>
  );
};

export default AILogoN;
