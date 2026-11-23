import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { StepItem } from '../../types';

interface CardSlidingReelProps {
  slides: StepItem[];
  isHovered: boolean;
  topicTitle: string;
  onOpenSlide?: (index: number) => void;
}

export const CardSlidingReel: React.FC<CardSlidingReelProps> = ({
  slides,
  isHovered,
  topicTitle,
  onOpenSlide,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = slides?.length || 0;

  // Auto-slide smoothly every 2.2 seconds when hovered
  useEffect(() => {
    if (!isHovered || totalSlides <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % totalSlides);
    }, 2200);

    return () => clearInterval(interval);
  }, [isHovered, totalSlides, isPaused]);

  // Reset to first slide when unhovered
  useEffect(() => {
    if (!isHovered) {
      setCurrentIdx(0);
      setIsPaused(false);
    }
  }, [isHovered]);

  // Preload all reel images in memory when hovered for instant seamless sliding
  useEffect(() => {
    if (isHovered && slides) {
      slides.forEach((s) => {
        if (s?.imageUrl) {
          const img = new Image();
          img.src = s.imageUrl;
        }
      });
    }
  }, [isHovered, slides]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(true);
    setCurrentIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(true);
    setCurrentIdx((prev) => (prev + 1) % totalSlides);
  };

  if (!slides || slides.length === 0) return null;

  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 z-20 bg-[#070B18]/95 backdrop-blur-md flex flex-col justify-between p-2.5 overflow-hidden"
          onMouseEnter={() => setIsPaused(false)}
        >
          {/* Top Info Bar inside card */}
          <div className="flex items-center justify-between text-[11px] font-mono px-1 z-30">
            <span className="flex items-center gap-1.5 text-cyan-electric font-semibold truncate max-w-[70%]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-electric animate-ping" />
              <span className="truncate">{topicTitle}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#12192E] border border-cyan-electric/40 text-[10px] text-content-primary font-bold shadow-sm shrink-0">
              {currentIdx + 1} / {totalSlides}
            </span>
          </div>

          {/* Sliding Viewport with Attractive Glowing Borders */}
          <div 
            className="relative flex-1 my-1.5 w-full flex items-center justify-center overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Sliding Track showing visible movement */}
            <div className="relative w-full h-full flex items-center justify-center">
              {slides.map((slide, idx) => {
                // Strict linear relative offset (never wraps last slide to before the first slide)
                const diff = idx - currentIdx;
                const isCenter = diff === 0;

                // Only render current slide and immediate linear neighbors
                if (Math.abs(diff) > 1) return null;

                return (
                  <motion.div
                    key={`reel-slide-${slide.id || idx}-${slide.imageUrl}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenSlide?.(idx);
                    }}
                    initial={false}
                    animate={{
                      x: `${diff * 78}%`,
                      scale: isCenter ? 1 : 0.82,
                      opacity: isCenter ? 1 : 0.45,
                      zIndex: isCenter ? 20 : 10,
                      rotateY: diff * -12,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 24,
                    }}
                    className={`absolute w-[78%] h-[92%] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 bg-[#0A0E1C] ${
                      isCenter
                        ? 'border-2 border-cyan-electric shadow-[0_0_20px_rgba(32,217,232,0.45)] ring-2 ring-cyan-electric/30'
                        : 'border border-border/70 hover:opacity-75'
                    }`}
                  >
                    {/* Real Diagram Image */}
                    <img
                      key={`reel-img-${slide.id || idx}`}
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-full h-full object-contain p-1 bg-[#060812]"
                      loading="eager"
                      decoding="sync"
                    />

                    {/* Attractive Overlay Pill with Title */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-1.5 flex items-center justify-between">
                      <p className="text-[10px] font-sans font-medium text-white truncate max-w-[85%]">
                        #{idx + 1} {slide.title}
                      </p>
                      {isCenter && (
                        <span className="text-[8px] font-mono text-lime-accent bg-lime-accent/15 px-1 rounded border border-lime-accent/30 shrink-0">
                          Click to view
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Left / Right Chevron Controls */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  aria-label="Previous Slide"
                  className="absolute left-1 z-30 p-1 rounded-full bg-black/80 hover:bg-cyan-electric hover:text-black text-cyan-electric border border-cyan-electric/40 backdrop-blur-xs transition-all shadow-md"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Slide"
                  className="absolute right-1 z-30 p-1 rounded-full bg-black/80 hover:bg-cyan-electric hover:text-black text-cyan-electric border border-cyan-electric/40 backdrop-blur-xs transition-all shadow-md"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Slide Indicator Dots */}
          <div className="flex items-center justify-center gap-1 z-30 pt-1">
            {slides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIdx(dotIdx);
                  setIsPaused(true);
                }}
                className={`transition-all rounded-full ${
                  currentIdx === dotIdx
                    ? 'w-4 h-1.5 bg-cyan-electric shadow-[0_0_8px_rgba(32,217,232,0.8)]'
                    : 'w-1.5 h-1.5 bg-border hover:bg-content-secondary'
                }`}
                title={`Jump to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
