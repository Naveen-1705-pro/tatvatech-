import React from 'react';
import { ArrowRight, Layers, Sparkles, BookOpen, Clock, Heart, Bookmark } from 'lucide-react';
import { Post } from '../../types';
import { useStore } from '../../lib/store';

interface FeaturedLessonProps {
  post: Post;
  onExplore: (post: Post) => void;
  onOpenAuthor?: () => void;
}

export const FeaturedLesson: React.FC<FeaturedLessonProps> = ({ post, onExplore, onOpenAuthor }) => {
  const { toggleLikePost, toggleBookmarkPost, userLikes, userBookmarks } = useStore();

  const isLiked = userLikes.includes(post.id);
  const isBookmarked = userBookmarks.includes(post.id);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Magazine Cover Style Frame */}
      <div className="relative rounded-3xl bg-gradient-to-br from-surface-card via-[#12192F] to-[#0A0E1D] border border-border/80 overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-12">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand/15 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-electric/10 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Magazine Grid Layout */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Magazine Typography & Metadata (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Label Pill */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-brand/20 border border-brand/50 text-cyan-electric text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                FEATURED KNOWLEDGE
              </span>
              <span className="text-content-secondary font-mono text-xs">•</span>
              <span className="text-accent-lime font-mono text-xs font-semibold">
                EDITOR'S CHOICE
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-content-primary leading-[1.15] tracking-tight">
              {post.title}
            </h2>

            {/* Narrative Summary */}
            <p className="font-sans text-content-secondary text-base sm:text-lg leading-relaxed max-w-2xl">
              {post.summary}
            </p>

            {/* Technical Metric Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-content-secondary">
              <span className="px-3 py-1.5 rounded-lg bg-surface-elevated border border-border flex items-center gap-1.5 text-content-primary">
                <Layers className="w-3.5 h-3.5 text-cyan-electric" />
                <span>{post.stepsCount} Visual Breakdown Phases</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-surface-elevated border border-border flex items-center gap-1.5 text-content-primary">
                <Clock className="w-3.5 h-3.5 text-accent-lime" />
                <span>{post.readTimeMinutes} min deep read</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-surface-elevated border border-border text-cyan-electric font-semibold">
                {post.difficulty}
              </span>
            </div>

            {/* Author Byline & CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/60">
              <div 
                className="flex items-center gap-3 cursor-pointer group/author"
                onClick={() => onOpenAuthor?.()}
                title="View Naveen Solanki's profile"
              >
                <img
                  src={post.creator.avatarUrl}
                  alt={post.creator.name}
                  className="w-11 h-11 rounded-xl object-cover object-center border-2 border-brand/60 shadow-md group-hover/author:border-cyan-electric transition-colors"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-bold text-sm text-content-primary group-hover/author:text-cyan-electric transition-colors">
                      {post.creator.name}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-electric" />
                  </div>
                  <p className="font-mono text-xs text-content-secondary">
                    @{post.creator.username} • {post.creator.expertise[0]}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleLikePost(post.id)}
                  className={`px-3 py-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
                    isLiked
                      ? 'bg-accent-coral/20 border-accent-coral text-accent-coral'
                      : 'bg-surface-elevated border-border text-content-secondary hover:text-content-primary'
                  }`}
                  title="Like"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-accent-coral' : ''}`} />
                  <span>{post.likesCount}</span>
                </button>

                <button
                  onClick={() => toggleBookmarkPost(post.id)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isBookmarked
                      ? 'bg-cyan-electric/20 border-cyan-electric text-cyan-electric'
                      : 'bg-surface-elevated border-border text-content-secondary hover:text-content-primary'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-cyan-electric' : ''}`} />
                </button>

                <button
                  onClick={() => onExplore(post)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand to-cyan-electric hover:shadow-glow-cyan text-content-primary font-heading font-semibold text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group shadow-glow-brand"
                >
                  <span>Explore Lesson</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Diagram Showcase (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#090D1A] border border-border p-3 shadow-2xl tech-grid-pattern overflow-hidden group">
              {/* Technical Circuit Tracer Frame */}
              <div className="absolute top-2 left-3 right-3 flex items-center justify-between font-mono text-[9px] text-content-muted z-10 bg-black/60 px-2 py-0.5 rounded">
                <span>{post.category}</span>
                <span className="text-cyan-electric">{post.stepsCount} DIAGRAM PHASES</span>
              </div>

              {/* High-Res Real Diagram Image */}
              <div className="w-full h-full flex items-center justify-center pt-5">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 rounded-lg"
                />
              </div>

              {/* Bottom Spec Badge */}
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-surface-card/90 backdrop-blur-md border border-cyan-electric/40 text-[10px] font-mono text-cyan-electric flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-electric animate-ping" />
                <span>REAL SYSTEM DIAGRAM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
