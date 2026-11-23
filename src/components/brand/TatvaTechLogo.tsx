import React from 'react';

export interface TatvaTechLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const TatvaTechLogo: React.FC<TatvaTechLogoProps> = ({
  size = 'md',
  showText = true,
  showTagline = false,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    sm: { icon: 30, text: 'text-lg', subtext: 'text-[9px]' },
    md: { icon: 40, text: 'text-2xl', subtext: 'text-[11px]' },
    lg: { icon: 52, text: 'text-3xl', subtext: 'text-xs' },
    xl: { icon: 68, text: 'text-4xl', subtext: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div 
      className={`inline-flex items-center gap-3 select-none group cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* =========================================================================
          TATVATECH EMBLEMATIC GEOMETRIC ELEMENTAL ICON
         ========================================================================= */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
        >
          <defs>
            {/* Primary Tatva Gradient (Cyan -> Violet -> Lime) */}
            <linearGradient id="tatvaPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#20D9E8" />
              <stop offset="50%" stopColor="#7C5CFC" />
              <stop offset="100%" stopColor="#B5F36A" />
            </linearGradient>

            {/* Tech Gradient (Violet -> Cyan) */}
            <linearGradient id="tatvaTechGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7C5CFC" />
              <stop offset="100%" stopColor="#20D9E8" />
            </linearGradient>

            {/* Glowing Accent Gradient */}
            <linearGradient id="tatvaLimeCyan" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#20D9E8" />
              <stop offset="100%" stopColor="#B5F36A" />
            </linearGradient>

            {/* Background Ambient Glow */}
            <radialGradient id="tatvaAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7C5CFC" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#20D9E8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0B1020" stopOpacity="0" />
            </radialGradient>

            {/* SVG Soft Glow Filter */}
            <filter id="tatvaGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ambient Backdrop Glow Aura */}
          <circle cx="50" cy="50" r="44" fill="url(#tatvaAura)" />

          {/* Outer Elemental Shield Matrix */}
          <polygon
            points="50,6 88,27 88,73 50,94 12,73 12,27"
            stroke="#2A3348"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="none"
          />

          {/* Inner Geometric Matrix Tracers */}
          <polygon
            points="50,14 82,31 82,69 50,86 18,69 18,31"
            stroke="url(#tatvaTechGrad)"
            strokeWidth="1"
            strokeOpacity="0.4"
            fill="none"
          />

          {/* 
            =====================================================================
            THE "T" MONOGRAM OF TATVATECH (Elemental Architecture Prism)
            =====================================================================
          */}
          {/* Top Horizontal Bar of the "T" (Segmented Left Facet) */}
          <polygon
            points="18,22 50,22 45,36 14,36"
            fill="url(#tatvaPrimary)"
            fillOpacity="0.3"
            stroke="url(#tatvaPrimary)"
            strokeWidth="2.5"
          />

          {/* Top Horizontal Bar of the "T" (Segmented Right Facet) */}
          <polygon
            points="50,22 82,22 86,36 55,36"
            fill="url(#tatvaLimeCyan)"
            fillOpacity="0.3"
            stroke="url(#tatvaLimeCyan)"
            strokeWidth="2.5"
          />

          {/* Center Top Keystone Diamond */}
          <polygon
            points="50,18 57,29 50,38 43,29"
            fill="#F8FAFC"
            filter="url(#tatvaGlow)"
          />

          {/* Vertical Stem of the "T" (Central Quantum Data Pillar) */}
          <polygon
            points="44,36 56,36 53,80 47,80"
            fill="url(#tatvaTechGrad)"
            fillOpacity="0.5"
            stroke="url(#tatvaTechGrad)"
            strokeWidth="2.5"
          />

          {/* Internal Isometric Facet Highlights */}
          <polygon
            points="47,38 50,38 50,78 48,78"
            fill="#FFFFFF"
            fillOpacity="0.4"
          />

          {/* Tatva Elemental Base Anchor (Foundation) */}
          <polygon
            points="38,80 62,80 50,90"
            fill="url(#tatvaPrimary)"
            fillOpacity="0.4"
            stroke="url(#tatvaPrimary)"
            strokeWidth="2"
          />

          {/* Core Energy Nodes (The Elements of Tech) */}
          {/* 1. Left Wing Node (Logic Element) */}
          <circle cx="16" cy="29" r="3.5" fill="#20D9E8" filter="url(#tatvaGlow)" />
          
          {/* 2. Right Wing Node (Architecture Element) */}
          <circle cx="84" cy="29" r="3.5" fill="#B5F36A" filter="url(#tatvaGlow)" />
          
          {/* 3. Base Node (Data Element) */}
          <circle cx="50" cy="85" r="4" fill="#7C5CFC" filter="url(#tatvaGlow)" />
          
          {/* 4. Heart Center Pulse Node */}
          <circle cx="50" cy="52" r="5" fill="#F8FAFC" filter="url(#tatvaGlow)" />
          <circle cx="50" cy="52" r="2.5" fill="#20D9E8" />

          {/* Circuit Trace Connectors */}
          <line x1="16" y1="29" x2="44" y2="52" stroke="#20D9E8" strokeWidth="1.5" strokeDasharray="2 2" strokeOpacity="0.7" />
          <line x1="84" y1="29" x2="56" y2="52" stroke="#B5F36A" strokeWidth="1.5" strokeDasharray="2 2" strokeOpacity="0.7" />
          <line x1="50" y1="52" x2="50" y2="80" stroke="#7C5CFC" strokeWidth="2" strokeOpacity="0.8" />
        </svg>

        {/* Ambient Pulsing Glow Underlay */}
        <div className="absolute inset-0 rounded-full bg-cyan-electric/20 blur-md pointer-events-none -z-10 group-hover:bg-accent-lime/25 transition-colors duration-500" />
      </div>

      {/* =========================================================================
          TATVATECH TYPOGRAPHY & TAGLINE
         ========================================================================= */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-heading font-extrabold tracking-tight ${currentSize.text} text-content-primary transition-colors flex items-center`}>
              <span>Tatva</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-electric via-[#38E1F0] to-accent-lime group-hover:from-accent-lime group-hover:to-cyan-electric transition-all">
                Tech
              </span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-electric animate-pulse shadow-[0_0_8px_#20D9E8]" />
          </div>

          {showTagline && (
            <span className={`font-mono ${currentSize.subtext} text-content-secondary tracking-wider uppercase mt-1`}>
              The Elemental Architecture of Tech
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Backwards-compatible export alias for any legacy imports
export { TatvaTechLogo as NexoraLogo };
