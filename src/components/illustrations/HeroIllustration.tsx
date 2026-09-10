import React from 'react';

export function HeroIllustration({ className = 'w-full h-auto max-w-lg mx-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="plumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A2E35" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#4A2E35" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="terraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C86D51" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#C86D51" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#C86D51" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Subtle Background Glow Spheres */}
      <circle cx="210" cy="160" r="110" fill="url(#plumGrad)" />
      <circle cx="390" cy="160" r="110" fill="url(#terraGrad)" />

      {/* Main Intersecting Journey Circles */}
      <circle
        cx="220"
        cy="160"
        r="95"
        stroke="#4A2E35"
        strokeWidth="1.75"
        strokeDasharray="4 3"
        className="opacity-40"
      />
      <circle
        cx="380"
        cy="160"
        r="95"
        stroke="#C86D51"
        strokeWidth="1.75"
        strokeDasharray="4 3"
        className="opacity-40"
      />

      {/* Symmetrical Reflected Orbit Rings */}
      <ellipse
        cx="300"
        cy="160"
        rx="180"
        ry="75"
        stroke="#4A2E35"
        strokeWidth="1"
        className="opacity-25"
      />
      <ellipse
        cx="300"
        cy="160"
        rx="140"
        ry="50"
        stroke="#D4AF37"
        strokeWidth="1.25"
        strokeDasharray="6 4"
        className="opacity-50"
      />

      {/* Central Lens of Mutual Understanding */}
      <path
        d="M 300 80 Q 240 160 300 240 Q 360 160 300 80 Z"
        fill="url(#terraGrad)"
        stroke="#C86D51"
        strokeWidth="1.5"
        className="opacity-90"
      />

      {/* Interlocking Golden Spark / Core Node */}
      <circle cx="300" cy="160" r="8" fill="#FDFBF7" stroke="#D4AF37" strokeWidth="2.5" />
      <circle cx="300" cy="160" r="3" fill="#4A2E35" />

      {/* Flow Nodes (36 Guna Milestones & 7 Vows Nodes) */}
      <g stroke="#4A2E35" strokeWidth="1.5" fill="#FDFBF7">
        <circle cx="125" cy="160" r="5" />
        <circle cx="160" cy="95" r="4" />
        <circle cx="240" cy="95" r="4.5" fill="#C86D51" stroke="none" />
        <circle cx="360" cy="95" r="4.5" fill="#4A2E35" stroke="none" />
        <circle cx="440" cy="95" r="4" />
        <circle cx="475" cy="160" r="5" />
        <circle cx="440" cy="225" r="4" />
        <circle cx="360" cy="225" r="4.5" fill="#C86D51" stroke="none" />
        <circle cx="240" cy="225" r="4.5" fill="#4A2E35" stroke="none" />
        <circle cx="160" cy="225" r="4" />
      </g>

      {/* Connecting Journey Line Arc */}
      <path
        d="M 120 160 C 180 60 420 60 480 160 C 420 260 180 260 120 160"
        stroke="url(#goldGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        className="opacity-70"
      />

      {/* Editorial Decorative Sparkles */}
      <path d="M 300 45 L 303 52 L 310 55 L 303 58 L 300 65 L 297 58 L 290 55 L 297 52 Z" fill="#D4AF37" />
      <path d="M 300 255 L 303 262 L 310 265 L 303 268 L 300 275 L 297 268 L 290 265 L 297 262 Z" fill="#C86D51" />
    </svg>
  );
}
