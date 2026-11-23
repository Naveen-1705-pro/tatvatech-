import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Play, Pause, Maximize2, Layers, Sparkles } from 'lucide-react';
import { StepItem } from '../../types';

interface FolderHoverSlideDeckProps {
  slides: StepItem[];
  topicTitle: string;
  category: string;
  authorName?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenLesson?: (stepIndex?: number) => void;
}

export const FullScreenRotatingSlideDeck: React.FC<FolderHoverSlideDeckProps> = ({
  slides,
  topicTitle,
  category,
  authorName = 'Naveen Solanki',
  isOpen,
  onClose,
  onOpenLesson,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);

  const totalSlides = slides?.length || 0;

  // Auto-rotate slowly when open unless user paused or is interacting
  useEffect(() => {
    if (!isOpen || totalSlides <= 1 || !isAutoRotating) return;

    const interval = setInterval(() => {
      setRotationAngle((prev) => prev - 0.5);
    }, 30);

    return () => clearInterval(interval);
  }, [isOpen, totalSlides, isAutoRotating]);

  // Snap to a specific slide with corrective angle
  const snapToSlide = (idx: number) => {
    setActiveIndex(idx);
    setIsAutoRotating(false);
    const angleStep = 360 / Math.max(totalSlides, 3);
    setRotationAngle(-idx * angleStep);
  };

  const nextSlide = () => {
    setIsAutoRotating(false);
    const next = (activeIndex + 1) % totalSlides;
    snapToSlide(next);
  };

  const prevSlide = () => {
    setIsAutoRotating(false);
    const prev = (activeIndex - 1 + totalSlides) % totalSlides;
    snapToSlide(prev);
  };

  // Keyboard navigation & ESC to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoRotating((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, totalSlides]);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
      setRotationAngle(0);
      setIsAutoRotating(true);
    }
  }, [isOpen]);

  if (!isOpen || !slides || slides.length === 0) return null;

  const currentSlide = slides[activeIndex] || slides[0];

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[9999] bg-[#070B18]/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 select-none overflow-hidden"
        onClick={onClose}
      >
        {/* Top Header Bar */}
        <div 
          className="flex items-center justify-between z-50 border-b border-border/80 pb-4 max-w-7xl mx-auto w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand/20 border border-brand/50 text-cyan-electric">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-cyan-electric font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-electric/10 border border-cyan-electric/30">
                  {category}
                </span>
                <span className="text-xs font-mono text-content-muted">• {authorName}</span>
              </div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-content-primary mt-1">
                {topicTitle}
              </h2>
            </div>
          </div>

          {/* Slide counter & Close Button */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-surface-elevated px-3 py-1.5 rounded-xl border border-border font-mono text-xs text-content-secondary">
              <span className="text-cyan-electric font-bold">{activeIndex + 1}</span>
              <span>/</span>
              <span>{totalSlides} Diagrams</span>
            </div>

            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-surface-card hover:bg-surface-elevated border border-border text-content-secondary hover:text-content-primary transition-all flex items-center gap-2 text-xs font-mono group"
            >
              <span>Close</span>
              <X className="w-4 h-4 text-cyan-electric group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        </div>

        {/* 3D Panoramic Rotating Screen Stage */}
        <div 
          className="relative flex-1 w-full my-4 flex items-center justify-center [perspective:1600px] cursor-grab active:cursor-grabbing"
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setIsAutoRotating(false)}
          onMouseLeave={() => setIsAutoRotating(true)}
        >
          {/* Orbital Rotation Ring */}
          <div
            className="relative w-full h-full max-h-[65vh] flex items-center justify-center [transform-style:preserve-3d] transition-transform duration-700 ease-out"
            style={{
              transform: `rotateY(${rotationAngle}deg)`
            }}
          >
            {slides.map((slide, idx) => {
              const angleStep = 360 / Math.max(totalSlides, 3);
              const currentAngle = idx * angleStep;
              
              // Angular position check
              const normalizedRotation = ((rotationAngle % 360) + 360) % 360;
              const totalItemAngle = (currentAngle + normalizedRotation) % 360;
              const isFrontFacing = totalItemAngle < 30 || totalItemAngle > 330;
              const isCurrentActive = idx === activeIndex;

              // Wide radius in full screen for spectacular 3D orbit
              const radius = Math.min(520, Math.max(280, totalSlides * 45));

              return (
                <motion.div
                  key={slide.id || idx}
                  onClick={() => snapToSlide(idx)}
                  className={`absolute rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 bg-[#0E1528] ${
                    isCurrentActive
                      ? 'border-2 border-cyan-electric ring-8 ring-cyan-electric/20 shadow-[0_0_50px_rgba(32,217,232,0.45)] z-50 brightness-105'
                      : isFrontFacing
                      ? 'border border-brand/60 opacity-85 hover:opacity-100 z-30'
                      : 'border border-border/60 opacity-30 hover:opacity-75 z-10'
                  }`}
                  style={{
                    width: 'clamp(280px, 48vw, 680px)',
                    aspectRatio: '16/10',
                    transform: `rotateY(${currentAngle}deg) translateZ(${radius}px) scale(${isCurrentActive ? 1.18 : 0.82})`,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {/* The Actual Real Diagram Image */}
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-contain p-2 bg-[#090D1A]"
                    loading="eager"
                  />

                  {/* Gradient Info Bar */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 sm:p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-electric/20 text-cyan-electric border border-cyan-electric/40">
                          #{idx + 1}
                        </span>
                        <h4 className="text-xs sm:text-sm font-heading font-bold text-white truncate max-w-xs sm:max-w-md">
                          {slide.title}
                        </h4>
                      </div>
                    </div>

                    {isCurrentActive && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-lime-accent bg-lime-accent/10 px-2 py-0.5 rounded border border-lime-accent/30">
                        <Sparkles className="w-3 h-3" />
                        Corrected
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation & Detail Bar */}
        <div 
          className="z-50 max-w-5xl mx-auto w-full bg-surface-elevated/90 backdrop-blur-md rounded-2xl border border-border p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left: Previous / Play / Next Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="p-2 rounded-xl bg-surface-card hover:bg-brand/20 border border-border text-content-secondary hover:text-cyan-electric transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsAutoRotating((prev) => !prev)}
              className="p-2 rounded-xl bg-surface-card hover:bg-brand/20 border border-border text-content-secondary hover:text-cyan-electric transition-colors flex items-center gap-1.5 px-3 text-xs font-mono"
            >
              {isAutoRotating ? (
                <>
                  <Pause className="w-4 h-4 text-accent-coral" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-accent-lime" />
                  <span>Auto-Spin</span>
                </>
              )}
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="p-2 rounded-xl bg-surface-card hover:bg-brand/20 border border-border text-content-secondary hover:text-cyan-electric transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Center: Current Slide Name & Takeaway */}
          <div className="text-center sm:text-left flex-1 px-4 truncate">
            <p className="font-heading font-bold text-sm text-content-primary truncate">
              {currentSlide?.title}
            </p>
            <p className="font-sans text-xs text-content-secondary truncate mt-0.5">
              {currentSlide?.explanation || 'Explore the complete diagram architecture and steps.'}
            </p>
          </div>

          {/* Right: Full Lesson Viewer Trigger */}
          <button
            onClick={() => {
              onClose();
              onOpenLesson?.(activeIndex);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand to-cyan-electric text-content-primary font-heading font-semibold text-xs transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-glow-brand shrink-0"
          >
            <span>Open Study Mode</span>
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};
