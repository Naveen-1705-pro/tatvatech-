import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Shield, Zap, Eye, Cpu, Flame, Layers } from 'lucide-react';

interface AnimatedAuthorAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showControls?: boolean;
  className?: string;
}

export const AnimatedAuthorAvatar: React.FC<AnimatedAuthorAvatarProps> = ({
  size = 'hero',
  showControls = true,
  className = ''
}) => {
  const [effectMode, setEffectMode] = useState<'anime' | 'hologram' | 'photo'>('anime');
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  // 3D Tilt on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -12;
    const rY = ((x - centerX) / centerX) * 12;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  // Size dimensions
  const sizeClasses = {
    sm: 'w-16 h-20 rounded-xl',
    md: 'w-28 h-36 rounded-2xl',
    lg: 'w-48 h-60 rounded-3xl',
    hero: 'w-72 sm:w-80 h-96 sm:h-[420px] rounded-3xl',
  };

  const activeImage = '/images/author/naveen_techie_avatar.svg';

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* 3D Floating Interactive Avatar Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`relative ${sizeClasses[size]} select-none cursor-pointer transition-transform duration-200 ease-out`}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* =========================================================================
            OUTER NEON GLOW & ROTATING CYBERNETIC RINGS
           ========================================================================= */}
        <div 
          className="absolute -inset-3 rounded-[32px] opacity-75 blur-xl transition-all duration-500 pointer-events-none"
          style={{
            background: effectMode === 'anime' 
              ? 'radial-gradient(circle, rgba(32, 217, 232, 0.55) 0%, rgba(255, 161, 22, 0.4) 40%, rgba(124, 92, 252, 0.35) 70%, transparent 85%)'
              : effectMode === 'hologram'
              ? 'radial-gradient(circle, rgba(32, 217, 232, 0.6) 0%, rgba(124, 92, 252, 0.45) 60%, transparent 80%)'
              : 'radial-gradient(circle, rgba(181, 243, 106, 0.4) 0%, rgba(32, 217, 232, 0.3) 60%, transparent 80%)',
          }}
        />

        {/* Orbiting Rotating Dashed Ring */}
        <div className="absolute -inset-4 pointer-events-none z-0">
          <svg className="w-full h-full animate-spin" style={{ animationDuration: '30s' }} viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke={effectMode === 'anime' ? '#FFA116' : effectMode === 'hologram' ? '#20D9E8' : '#B5F36A'}
              strokeWidth="0.8"
              strokeDasharray="4 6 12 6"
              opacity="0.65"
            />
          </svg>
        </div>

        {/* Counter-Rotating Tech Ring */}
        <div className="absolute -inset-2 pointer-events-none z-0">
          <svg className="w-full h-full animate-spin" style={{ animationDuration: '22s', animationDirection: 'reverse' }} viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="48.5"
              fill="none"
              stroke="#20D9E8"
              strokeWidth="0.6"
              strokeDasharray="2 16 8 8"
              opacity="0.55"
            />
          </svg>
        </div>

        {/* =========================================================================
            CARD SHELL & PERFECTLY CENTERED FACE CONTAINER
           ========================================================================= */}
        <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-[#0A0D18] border-2 border-cyan-electric/70 shadow-[0_0_35px_rgba(32,217,232,0.4)] ring-1 ring-cyan-electric/40">
          
          {/* Centered Face Image */}
          <div className="relative w-full h-full">
            <img
              src={activeImage}
              alt="Naveen Solanki - Anime Techie"
              className={`w-full h-full object-cover object-center transition-all duration-500 ${
                effectMode === 'anime'
                  ? 'brightness-110 contrast-120 saturate-140 filter drop-shadow-md'
                  : effectMode === 'hologram'
                  ? 'brightness-105 contrast-115 saturate-125 hue-rotate-15'
                  : 'contrast-105 brightness-100'
              }`}
            />

            {/* Anime Techie Halftone & Cyber Grid Overlay */}
            {effectMode === 'anime' && (
              <>
                <div 
                  className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
                  style={{
                    backgroundImage: 'radial-gradient(#20D9E8 1.2px, transparent 1.2px)',
                    backgroundSize: '8px 8px',
                  }}
                />
                {/* Subtle anime vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/80 via-transparent to-transparent pointer-events-none" />
              </>
            )}

            {/* Holographic Cyan-to-Purple Duotone Gradient Overlay */}
            {effectMode === 'hologram' && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/90 via-[#7C5CFC]/20 to-[#20D9E8]/25 mix-blend-color-dodge pointer-events-none" />
            )}

            {/* =====================================================================
                ANIME GLASSES GLEAM / GLINT SHINE ANIMATION
               ===================================================================== */}
            <motion.div
              animate={{ 
                opacity: [0, 0, 1, 0.9, 0, 0],
                scale: [0.6, 0.8, 1.35, 1.15, 0.6, 0.6],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3.8, 
                ease: "easeInOut", 
                times: [0, 0.45, 0.52, 0.58, 0.65, 1] 
              }}
              className="absolute top-[43%] left-[36%] w-7 h-7 pointer-events-none z-20 flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-cyan-electric drop-shadow-[0_0_12px_#20D9E8]" />
            </motion.div>

            <motion.div
              animate={{ 
                opacity: [0, 0, 0.9, 1, 0, 0],
                scale: [0.5, 0.7, 1.25, 1.05, 0.5, 0.5],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3.8, 
                ease: "easeInOut", 
                times: [0, 0.48, 0.55, 0.61, 0.68, 1] 
              }}
              className="absolute top-[44%] right-[33%] w-6 h-6 pointer-events-none z-20 flex items-center justify-center"
            >
              <Sparkles className="w-4 h-4 text-accent-lime drop-shadow-[0_0_10px_#B5F36A]" />
            </motion.div>

            {/* =====================================================================
                ANIMATED SCANLINE BEAM (Continuously Sweeping Vertical Laser)
               ===================================================================== */}
            <motion.div
              animate={{ y: ['-100%', '300%'] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: 'linear' }}
              className="absolute inset-x-0 h-14 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(32, 217, 232, 0.45) 50%, rgba(181, 243, 106, 0.75) 52%, transparent)',
                boxShadow: '0 0 16px rgba(32, 217, 232, 0.75)',
              }}
            />

            {/* CRT Horizontal Scanline Grid */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.6) 2px, rgba(0, 0, 0, 0.6) 4px)',
              }}
            />

            {/* Dynamic Glass Sheen Glare (Moves with mouse) */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.75) 0%, transparent 60%)`,
              }}
            />
          </div>

          {/* =====================================================================
              CYBERNETIC HUD OVERLAYS (Corners, Status, Reticles)
             ===================================================================== */}
          {/* Targeting Corner Brackets */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-cyan-electric pointer-events-none z-20 shadow-[0_0_8px_#20D9E8]" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-cyan-electric pointer-events-none z-20 shadow-[0_0_8px_#20D9E8]" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-cyan-electric pointer-events-none z-20 shadow-[0_0_8px_#20D9E8]" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-cyan-electric pointer-events-none z-20 shadow-[0_0_8px_#20D9E8]" />

          {/* Top Tech Data Bar */}
          <div className="absolute top-3 inset-x-6 flex items-center justify-between font-mono text-[9px] text-cyan-electric pointer-events-none z-20">
            <span className="flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded backdrop-blur-md border border-cyan-electric/40">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-ping" />
              ANIME // TECHIE PROT.
            </span>
            <span className="bg-black/70 px-2 py-0.5 rounded backdrop-blur-md border border-cyan-electric/40 text-cyan-electric font-bold flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" />
              ALGO ARCHITECT
            </span>
          </div>

          {/* Bottom Holographic HUD Plate */}
          <div className="absolute bottom-3 inset-x-3 p-3 rounded-2xl bg-[#0B1020]/95 backdrop-blur-md border border-cyan-electric/50 z-20 flex items-center justify-between shadow-xl">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xs sm:text-sm text-content-primary leading-tight">
                  Naveen Solanki
                </span>
                <Shield className="w-3.5 h-3.5 text-accent-lime shrink-0" />
              </div>
              <p className="font-mono text-[9px] text-cyan-electric leading-tight flex items-center gap-1">
                <Cpu className="w-2.5 h-2.5" />
                <span>AI & Software Engineer</span>
              </p>
            </div>

            {/* Glowing status pill */}
            <div className="px-2 py-1 rounded-lg bg-cyan-electric/15 border border-cyan-electric/40 font-mono text-[9px] text-cyan-electric font-bold tracking-wider shrink-0 flex items-center gap-1">
              <Zap className="w-3 h-3 text-accent-lime animate-pulse" />
              <span>NEXORA</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE ANIMATION MODE CONTROLS (Anime / Hologram / Photo)
         ========================================================================= */}
      {showControls && (
        <div className="mt-5 flex items-center gap-1.5 p-1 rounded-xl bg-surface-card border border-border shadow-lg font-mono text-xs">
          <button
            onClick={() => setEffectMode('anime')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              effectMode === 'anime'
                ? 'bg-[#FFA116]/20 text-[#FFA116] border border-[#FFA116]/60 font-bold shadow-[0_0_12px_rgba(255,161,22,0.35)]'
                : 'text-content-secondary hover:text-content-primary hover:bg-surface-elevated'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Anime Techie</span>
          </button>

          <button
            onClick={() => setEffectMode('hologram')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              effectMode === 'hologram'
                ? 'bg-cyan-electric/20 text-cyan-electric border border-cyan-electric/50 font-bold shadow-[0_0_12px_rgba(32,217,232,0.3)]'
                : 'text-content-secondary hover:text-content-primary hover:bg-surface-elevated'
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>Cyber Hologram</span>
          </button>
        </div>
      )}
    </div>
  );
};
