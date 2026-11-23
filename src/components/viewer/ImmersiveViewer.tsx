import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Bookmark, 
  Share2, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  MessageSquare, 
  CheckCircle2, 
  Copy, 
  Check, 
  Code2, 
  Sparkles,
  ExternalLink,
  BookOpen,
  Mail
} from 'lucide-react';
import { Post, StepItem } from '../../types';
import { useStore } from '../../lib/store';

interface ImmersiveViewerProps {
  post: Post;
  initialStepIndex?: number;
  onClose: () => void;
}

export const ImmersiveViewer: React.FC<ImmersiveViewerProps> = ({ post, initialStepIndex, onClose }) => {
  const { 
    toggleLikePost, 
    toggleBookmarkPost, 
    userLikes, 
    userBookmarks, 
    updateReadingProgress, 
    readingProgress,
    comments,
    addComment,
    likeComment,
    toggleFollowCreator,
    followedCreators
  } = useStore();

  const [currentStepIdx, setCurrentStepIdx] = useState(() => {
    if (typeof initialStepIndex === 'number' && initialStepIndex >= 0 && initialStepIndex < post.steps.length) {
      return initialStepIndex;
    }
    const savedStep = readingProgress[post.id];
    return savedStep ? Math.min(Math.max(savedStep - 1, 0), post.steps.length - 1) : 0;
  });

  useEffect(() => {
    if (typeof initialStepIndex === 'number' && initialStepIndex >= 0 && initialStepIndex < post.steps.length) {
      setCurrentStepIdx(initialStepIndex);
    }
  }, [initialStepIndex, post.id]);

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  // Preload all step images into browser cache so slide transitions are instantaneous and never flash previous images
  useEffect(() => {
    if (!post?.steps) return;
    post.steps.forEach((s) => {
      if (s?.imageUrl) {
        const img = new Image();
        img.src = s.imageUrl;
        img.onload = () => {
          setLoadedImages((prev) => ({ ...prev, [s.imageUrl]: true }));
        };
      }
    });
  }, [post?.id, post?.steps]);

  const isLiked = userLikes.includes(post.id);
  const isBookmarked = userBookmarks.includes(post.id);
  const isFollowed = followedCreators.includes(post.creator.id);

  const currentStep: StepItem = post.steps[currentStepIdx] || post.steps[0];
  const postComments = comments[post.id] || [];

  const goToNext = () => {
    if (currentStepIdx < post.steps.length - 1) {
      setDirection(1);
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentStepIdx > 0) {
      setDirection(-1);
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const goToIndex = (targetIdx: number) => {
    if (targetIdx !== currentStepIdx) {
      setDirection(targetIdx > currentStepIdx ? 1 : -1);
      setCurrentStepIdx(targetIdx);
    }
  };

  // Sync reading progress
  useEffect(() => {
    updateReadingProgress(post.id, currentStepIdx + 1);
  }, [currentStepIdx, post.id, updateReadingProgress]);

  // Keyboard navigation: Left/Right arrows, ESC to close, F for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIdx, post.steps.length, isFullscreen, onClose]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  const [readerName, setReaderName] = useState('');
  const [feedbackReaction, setFeedbackReaction] = useState<string | null>(null);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    addComment(post.id, newCommentText, readerName.trim() || undefined);
    setNewCommentText('');
  };

  const progressPercentage = ((currentStepIdx + 1) / post.steps.length) * 100;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col bg-[#0B1020] text-content-primary transition-all duration-300 ${isFullscreen ? 'p-0' : ''}`}>
      {/* Top Reading Progress Bar */}
      <div className="w-full h-1 bg-surface-card relative overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-brand via-cyan-electric to-accent-lime transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Header Bar */}
      <header className="px-4 py-3 sm:px-6 flex items-center justify-between border-b border-border bg-surface-card/90 backdrop-blur-md z-20">
        {/* Left: Back, Category, Lesson Title */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg bg-surface-elevated hover:bg-brand/20 border border-border hover:border-brand text-content-secondary hover:text-content-primary transition-all shrink-0"
            title="Close viewer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-brand/20 border border-brand/40 text-cyan-electric font-mono text-[10px] font-semibold uppercase">
                {post.category}
              </span>
              <span className="text-content-secondary hidden sm:inline">•</span>
              <span className="text-content-secondary font-mono text-[11px] hidden sm:inline">
                Step {currentStepIdx + 1} of {post.steps.length}
              </span>
            </div>
            <h1 className="font-heading font-bold text-sm sm:text-base text-content-primary truncate max-w-[280px] sm:max-w-md md:max-w-xl">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Right: Actions (Like, Bookmark, Share, Fullscreen, Comments) */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Like */}
          <button
            onClick={() => toggleLikePost(post.id)}
            className={`p-2 rounded-lg border transition-all duration-200 flex items-center gap-1.5 text-xs font-mono ${
              isLiked
                ? 'bg-accent-coral/20 border-accent-coral text-accent-coral shadow-glow-coral'
                : 'bg-surface-elevated border-border text-content-secondary hover:text-content-primary'
            }`}
            title="Like this visual explanation"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-accent-coral' : ''}`} />
            <span className="hidden md:inline">{post.likesCount}</span>
          </button>

          {/* Bookmark */}
          <button
            onClick={() => toggleBookmarkPost(post.id)}
            className={`p-2 rounded-lg border transition-all duration-200 flex items-center gap-1.5 text-xs font-mono ${
              isBookmarked
                ? 'bg-cyan-electric/20 border-cyan-electric text-cyan-electric shadow-glow-cyan'
                : 'bg-surface-elevated border-border text-content-secondary hover:text-content-primary'
            }`}
            title="Save to bookmarks"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-cyan-electric' : ''}`} />
            <span className="hidden md:inline">{post.bookmarksCount}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-surface-elevated hover:bg-surface-card border border-border text-content-secondary hover:text-content-primary transition-all relative"
            title="Share lesson"
          >
            <Share2 className="w-4 h-4" />
            {shareToast && (
              <span className="absolute -bottom-9 right-0 px-2 py-1 bg-surface-elevated border border-accent-lime text-accent-lime text-[10px] font-mono rounded shadow-lg whitespace-nowrap">
                Link Copied!
              </span>
            )}
          </button>

          {/* Comments Toggle */}
          <button
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            className={`p-2 rounded-lg border transition-all flex items-center gap-1 text-xs font-mono ${
              isCommentsOpen
                ? 'bg-brand/30 border-brand text-cyan-electric'
                : 'bg-surface-elevated border-border text-content-secondary hover:text-content-primary'
            }`}
            title="View discussion"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">{postComments.length}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg bg-surface-elevated hover:bg-surface-card border border-border text-content-secondary hover:text-content-primary transition-all"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen presentation mode'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Body (Split layout: Left/Center Diagram Viewer, Right Narrative Breakdown) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Visual Stage / Image Display Area */}
        <div className="flex-1 flex flex-col bg-[#070B16] relative overflow-hidden">
          {/* Zoom Controls Overlay */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1 p-1 bg-surface-card/80 backdrop-blur-md rounded-lg border border-border">
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
              className="p-1 rounded hover:bg-surface-elevated text-content-secondary hover:text-content-primary"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-[10px] font-mono text-content-secondary">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
              className="p-1 rounded hover:bg-surface-elevated text-content-secondary hover:text-content-primary"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="px-1.5 py-0.5 text-[9px] font-mono text-cyan-electric hover:underline"
            >
              Reset
            </button>
          </div>

          {/* Center Visual Diagram Container with Sliding Animation & Glowing Attractive Borders */}
          <div className="flex-1 flex flex-col items-center p-4 sm:p-8 overflow-y-auto tech-grid-pattern relative">
            <div 
              className="relative transition-transform duration-200 ease-out max-w-full flex items-center justify-center [perspective:1200px] w-full"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentStep.id || currentStepIdx}
                  custom={direction}
                  variants={{
                    enter: (dir: number) => ({
                      x: dir > 0 ? 260 : -260,
                      opacity: 0,
                      scale: 0.92,
                      rotateY: dir > 0 ? 8 : -8,
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                      scale: 1,
                      rotateY: 0,
                      transition: {
                        x: { type: 'spring', stiffness: 280, damping: 25 },
                        opacity: { duration: 0.26 },
                        scale: { duration: 0.26 },
                        rotateY: { duration: 0.26 },
                      },
                    },
                    exit: (dir: number) => ({
                      x: dir < 0 ? 260 : -260,
                      opacity: 0,
                      scale: 0.92,
                      rotateY: dir < 0 ? 8 : -8,
                      transition: {
                        x: { type: 'spring', stiffness: 280, damping: 25 },
                        opacity: { duration: 0.18 },
                      },
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative rounded-2xl overflow-hidden border-2 border-cyan-electric/80 shadow-[0_0_35px_rgba(32,217,232,0.4)] ring-4 ring-cyan-electric/20 bg-[#080C1A] group max-w-4xl w-full"
                >
                  {/* REAL DIAGRAM IMAGE DISPLAY WITH FLICKER-FREE STEP KEY & PRELOAD */}
                  <div className="w-full max-h-[72vh] min-h-[280px] sm:min-h-[380px] flex items-center justify-center p-3 sm:p-6 bg-[#060812] relative">
                    {!loadedImages[currentStep.imageUrl] && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-[#060812]/90 backdrop-blur-sm z-10">
                        <div className="w-7 h-7 rounded-full border-2 border-cyan-electric/25 border-t-cyan-electric animate-spin" />
                        <span className="font-mono text-[11px] text-cyan-electric/70">Loading diagram step {currentStep.stepNumber}...</span>
                      </div>
                    )}
                    <img
                      key={`diagram-${currentStep.id || currentStepIdx}-${currentStep.imageUrl}`}
                      src={currentStep.imageUrl}
                      alt={currentStep.title}
                      loading="eager"
                      decoding="sync"
                      onLoad={() => {
                        setLoadedImages((prev) => ({ ...prev, [currentStep.imageUrl]: true }));
                      }}
                      className={`max-h-[66vh] w-auto max-w-full object-contain filter drop-shadow-2xl rounded-lg transition-opacity duration-150 ${
                        loadedImages[currentStep.imageUrl] ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>

                  {/* Step Overlay Pill */}
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-cyan-electric/50 flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-cyan-electric animate-pulse" />
                    <span className="font-mono text-xs text-content-primary font-semibold">
                      STEP {currentStep.stepNumber}: {currentStep.title}
                    </span>
                  </div>

                  {/* Top Right Counter Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-electric/40 text-[11px] font-mono text-cyan-electric shadow-md">
                    {currentStepIdx + 1} / {post.steps.length}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Quick Floating Previous & Next Chevrons on Image Stage */}
              {currentStepIdx > 0 && (
                <button
                  onClick={goToPrev}
                  aria-label="Previous Diagram"
                  className="absolute -left-2 sm:-left-5 z-30 p-2.5 rounded-full bg-[#0B1020]/90 hover:bg-cyan-electric hover:text-black text-cyan-electric border border-cyan-electric/50 backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {currentStepIdx < post.steps.length - 1 && (
                <button
                  onClick={goToNext}
                  aria-label="Next Diagram"
                  className="absolute -right-2 sm:-right-5 z-30 p-2.5 rounded-full bg-[#0B1020]/90 hover:bg-cyan-electric hover:text-black text-cyan-electric border border-cyan-electric/50 backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Below Every Image: Direct Comment & Feedback Section */}
            <div className="w-full max-w-4xl mt-6 p-4 sm:p-6 rounded-2xl bg-surface-card/95 border border-border/90 shadow-2xl space-y-4">
              {/* Header & Live Dynamic Like Counter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/80">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-electric" />
                  <h3 className="font-heading font-bold text-sm text-content-primary">
                    Feedback & Comments for Diagram #{currentStep.stepNumber}
                  </h3>
                  <span className="text-[11px] font-mono text-cyan-electric bg-cyan-electric/10 px-2 py-0.5 rounded-full border border-cyan-electric/30">
                    {postComments.length} {postComments.length === 1 ? 'Comment' : 'Comments'}
                  </span>
                </div>

                {/* Like Button with Real Live Counter starting from 0 */}
                <button
                  onClick={() => toggleLikePost(post.id)}
                  className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 ${
                    isLiked
                      ? 'bg-accent-coral/20 border-accent-coral text-accent-coral shadow-[0_0_15px_rgba(255,140,102,0.35)]'
                      : 'bg-surface-elevated border-border text-content-secondary hover:text-content-primary hover:border-cyan-electric/50'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-accent-coral' : ''}`} />
                  <span>{isLiked ? 'Liked' : 'Like'}</span>
                  <span className="font-bold">({post.likesCount})</span>
                </button>
              </div>

              {/* Quick 1-Click Feedback Reactions */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-mono text-content-muted mr-1">Quick feedback:</span>
                {[
                  '💡 Crystal clear diagram',
                  '🔥 Highly valuable',
                  '🧠 Deep architecture',
                  '❓ Have a question'
                ].map((reaction) => (
                  <button
                    key={reaction}
                    type="button"
                    onClick={() => {
                      addComment(
                        post.id,
                        `${reaction} on Step ${currentStep.stepNumber}: ${currentStep.title}`,
                        readerName.trim() || undefined
                      );
                    }}
                    className="px-2.5 py-1 rounded-lg bg-surface-elevated hover:bg-brand/20 border border-border/70 hover:border-cyan-electric/50 text-[11px] font-mono text-content-secondary hover:text-cyan-electric transition-all"
                  >
                    {reaction}
                  </button>
                ))}
              </div>

              {/* Comment Input Form */}
              <form onSubmit={handleAddComment} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Your name (e.g. Alex, Maya)"
                    value={readerName}
                    onChange={(e) => setReaderName(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-content-primary placeholder:text-content-muted font-sans focus:outline-hidden focus:border-cyan-electric transition-colors sm:w-48"
                  />
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      placeholder={`Ask a question or leave feedback on Diagram #${currentStep.stepNumber}...`}
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-content-primary placeholder:text-content-muted font-sans focus:outline-hidden focus:border-cyan-electric transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={!newCommentText.trim()}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand to-cyan-electric text-content-primary font-heading font-semibold text-xs transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:pointer-events-none shadow-glow-brand shrink-0"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </form>

              {/* Comments Stream */}
              <div className="space-y-2 pt-1">
                {postComments.length === 0 ? (
                  <div className="text-center py-4 px-3 rounded-xl bg-surface-elevated/40 border border-border/50 text-xs font-mono text-content-muted">
                    No feedback on this diagram yet. Be the first to leave a comment or reaction above!
                  </div>
                ) : (
                  postComments.map((cm) => (
                    <div
                      key={cm.id}
                      className="p-3 rounded-xl bg-surface-elevated/80 border border-border/80 flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-brand/20 border border-brand/50 flex items-center justify-center font-mono text-xs font-bold text-cyan-electric shrink-0 mt-0.5">
                          {cm.author.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-bold text-xs text-content-primary">
                              {cm.author.name}
                            </span>
                            <span className="font-mono text-[10px] text-content-muted">
                              {cm.timestamp}
                            </span>
                          </div>
                          <p className="font-sans text-xs text-content-secondary mt-1 leading-relaxed">
                            {cm.content}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => likeComment(post.id, cm.id)}
                        className={`p-1.5 rounded-lg border text-[11px] font-mono flex items-center gap-1 transition-colors ${
                          cm.isLiked
                            ? 'bg-accent-coral/20 border-accent-coral text-accent-coral'
                            : 'bg-surface-card border-border text-content-muted hover:text-content-primary'
                        }`}
                        title="Like comment"
                      >
                        <Heart className={`w-3 h-3 ${cm.isLiked ? 'fill-accent-coral' : ''}`} />
                        <span>{cm.likes}</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Navigation Controls Bar at bottom of stage */}
          <div className="p-3 sm:p-4 bg-surface-card/90 border-t border-border flex items-center justify-between">
            <button
              onClick={goToPrev}
              disabled={currentStepIdx === 0}
              className="px-3 sm:px-4 py-2 rounded-xl bg-surface-elevated hover:bg-brand/20 border border-border hover:border-brand disabled:opacity-40 disabled:pointer-events-none text-xs sm:text-sm font-mono flex items-center gap-2 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Thumbnail Sequence Track */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-[50%] px-2 py-1 scrollbar-none">
              {post.steps.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => goToIndex(idx)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all shrink-0 flex items-center gap-1.5 ${
                    currentStepIdx === idx
                      ? 'bg-brand text-content-primary shadow-glow-brand font-bold border border-cyan-electric'
                      : 'bg-surface-elevated text-content-secondary hover:text-content-primary border border-border'
                  }`}
                >
                  <span>{idx + 1}</span>
                  <span className="hidden md:inline truncate max-w-[80px]">{step.title}</span>
                </button>
              ))}
            </div>

            <button
              onClick={goToNext}
              disabled={currentStepIdx === post.steps.length - 1}
              className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-brand to-cyan-electric text-content-primary disabled:opacity-40 disabled:pointer-events-none text-xs sm:text-sm font-mono flex items-center gap-2 shadow-glow-brand transition-all hover:scale-105 active:scale-95"
            >
              <span>{currentStepIdx === post.steps.length - 1 ? 'Completed' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Narrative Panel (Right on Desktop, Bottom on Mobile) */}
        <div className="w-full lg:w-[420px] xl:w-[460px] bg-surface-card border-t lg:border-t-0 lg:border-l border-border flex flex-col h-[320px] lg:h-full overflow-y-auto">
          <div className="p-5 sm:p-6 space-y-6">
            {/* Step Header */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-cyan-electric mb-1">
                <span>PHASE {currentStep.stepNumber} OF {post.steps.length}</span>
                <span className="text-content-secondary">{post.difficulty}</span>
              </div>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-content-primary leading-tight">
                {currentStep.title}
              </h2>
            </div>

            {/* Explanation Narrative */}
            <div className="prose prose-invert prose-sm text-content-secondary leading-relaxed space-y-3 font-sans text-sm">
              <p>{currentStep.explanation}</p>
            </div>

            {/* Key Takeaway Callout */}
            {currentStep.keyTakeaway && (
              <div className="p-3.5 rounded-xl bg-surface-elevated border border-accent-lime/40 text-xs shadow-sm">
                <div className="flex items-center gap-1.5 font-heading font-bold text-accent-lime mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>KEY ARCHITECTURAL INSIGHT</span>
                </div>
                <p className="text-content-primary font-sans">
                  {currentStep.keyTakeaway}
                </p>
              </div>
            )}

            {/* Code Snippet Box (if step includes code) */}
            {currentStep.codeSnippet && (
              <div className="rounded-xl overflow-hidden border border-border bg-[#0B1020]">
                <div className="px-3.5 py-2 bg-surface-elevated border-b border-border flex items-center justify-between text-xs font-mono text-content-secondary">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-cyan-electric" />
                    <span>{currentStep.codeLanguage || 'terminal'}</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(currentStep.codeSnippet || '')}
                    className="p-1 rounded hover:bg-surface-card text-content-secondary hover:text-content-primary transition-colors flex items-center gap-1 text-[11px]"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-accent-lime" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3.5 text-xs font-mono text-cyan-glow overflow-x-auto leading-relaxed">
                  <code>{currentStep.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Author Byline & Follow Action */}
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.creator.avatarUrl}
                  alt={post.creator.name}
                  className="w-10 h-10 rounded-xl object-cover border border-brand/50"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-content-primary leading-tight">
                    {post.creator.name}
                  </h4>
                  <p className="text-xs font-mono text-content-secondary">
                    @{post.creator.username}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleFollowCreator(post.creator.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  isFollowed
                    ? 'bg-surface-elevated border border-border text-content-secondary hover:text-content-primary'
                    : 'bg-brand hover:bg-brand-light text-content-primary shadow-glow-brand font-semibold'
                }`}
              >
                {isFollowed ? 'Following' : '+ Follow'}
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-surface-elevated border border-border text-[11px] font-mono text-content-secondary"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Slide-out Discussion / Comments Drawer */}
        {isCommentsOpen && (
          <div className="absolute top-0 right-0 bottom-0 w-full sm:w-[380px] bg-surface-elevated/95 backdrop-blur-xl border-l border-border z-30 flex flex-col shadow-2xl">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-electric" />
                <h3 className="font-heading font-bold text-sm text-content-primary">
                  Discussion ({postComments.length})
                </h3>
              </div>
              <button
                onClick={() => setIsCommentsOpen(false)}
                className="p-1 rounded hover:bg-surface-card text-content-secondary hover:text-content-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Feedback Reaction Bar for Readers */}
            <div className="p-3 bg-surface-card border-b border-border">
              <span className="font-mono text-[10px] text-content-muted block mb-1.5 uppercase">
                Reader Quick Reaction:
              </span>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {[
                  { emoji: '💡', text: 'Crystal Clear' },
                  { emoji: '🚀', text: 'Great Diagram' },
                  { emoji: '🤔', text: 'Need More Details' },
                ].map((reaction) => (
                  <button
                    key={reaction.text}
                    onClick={() => {
                      setFeedbackReaction(reaction.text);
                      addComment(post.id, `${reaction.emoji} ${reaction.text} on step ${currentStepIdx + 1}!`, readerName || undefined);
                    }}
                    className="px-2 py-1 rounded-md bg-surface-elevated hover:bg-brand/20 border border-border text-[10px] font-mono text-content-secondary hover:text-cyan-electric whitespace-nowrap transition-colors flex items-center gap-1"
                  >
                    <span>{reaction.emoji}</span>
                    <span>{reaction.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Comments List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {postComments.length === 0 ? (
                <div className="py-12 text-center text-content-secondary text-sm space-y-2">
                  <p>No questions yet.</p>
                  <p className="text-xs text-content-muted">
                    Have feedback or a question about this step? Post below!
                  </p>
                </div>
              ) : (
                postComments.map((cm) => (
                  <div key={cm.id} className="p-3 rounded-xl bg-surface-card border border-border/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={cm.author.avatarUrl}
                          alt={cm.author.name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-heading font-bold text-content-primary">{cm.author.name}</span>
                      </div>
                      <span className="text-content-muted font-mono text-[10px]">{cm.timestamp}</span>
                    </div>
                    <p className="text-xs text-content-secondary leading-relaxed">{cm.content}</p>
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => likeComment(post.id, cm.id)}
                        className={`flex items-center gap-1 text-[11px] font-mono transition-colors ${
                          cm.isLiked ? 'text-accent-coral font-bold' : 'text-content-secondary hover:text-content-primary'
                        }`}
                      >
                        <Heart className={`w-3 h-3 ${cm.isLiked ? 'fill-accent-coral' : ''}`} />
                        <span>{cm.likes}</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Input Form */}
            <form onSubmit={handleAddComment} className="p-3 sm:p-4 border-t border-border bg-surface-card space-y-2">
              <input
                type="text"
                value={readerName}
                onChange={(e) => setReaderName(e.target.value)}
                placeholder="Your name or handle (e.g. Maya)"
                className="w-full px-3 py-1.5 rounded-lg bg-surface-elevated border border-border text-[11px] text-content-primary placeholder-content-muted focus:outline-none focus:border-cyan-electric font-mono"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Ask question or share feedback..."
                  className="flex-1 px-3 py-2 rounded-lg bg-surface-elevated border border-border text-xs text-content-primary placeholder-content-muted focus:outline-none focus:border-cyan-electric"
                />
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="px-3 py-2 rounded-lg bg-brand hover:bg-brand-light disabled:opacity-40 text-xs font-mono font-semibold text-content-primary transition-all shrink-0"
                >
                  Post
                </button>
              </div>
              <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-content-muted">
                <span>Direct line to author:</span>
                <a
                  href={`mailto:suman0383solanki@gmail.com?subject=${encodeURIComponent(`[TatvaTech Question] ${post.title} (Step ${currentStepIdx + 1})`)}`}
                  className="text-cyan-electric hover:underline flex items-center gap-1"
                  title="Email Naveen directly"
                >
                  <Mail className="w-3 h-3 text-cyan-electric" />
                  <span>suman0383solanki@gmail.com</span>
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
