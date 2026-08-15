import { useId } from "react";

export default function Logo({ className = "", showTagline = false }) {
  const gradId = useId();

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="h-8 w-8 md:h-9 md:w-9 shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B6BFF" />
            <stop offset="45%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <path
          d="M50,10 L86,32 L86,72 L50,94 L14,72 L14,32 Z"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <text
          x="50"
          y="68"
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
          fontSize="48"
          fill={`url(#${gradId})`}
        >
          S
        </text>
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-display font-semibold text-lg md:text-xl text-mist tracking-tight">
          Csync
        </span>
        {showTagline && (
          <span className="eyebrow text-mist-faint text-[9px] mt-0.5">
            Tecnologia
          </span>
        )}
      </div>
    </div>
  );
}
