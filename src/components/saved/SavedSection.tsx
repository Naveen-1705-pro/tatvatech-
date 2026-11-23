import React, { useState } from 'react';
import { Bookmark, Layers, ArrowRight, Sparkles, Trash2, BookOpen } from 'lucide-react';
import { Post } from '../../types';
import { useStore } from '../../lib/store';
import { CardSlidingReel } from '../common/CardSlidingReel';

interface SavedSectionProps {
  onOpenPost: (post: Post, initialStepIndex?: number) => void;
  onExploreMore: () => void;
}

export const SavedSection: React.FC<SavedSectionProps> = ({ onOpenPost, onExploreMore }) => {
  const { posts, userBookmarks, toggleBookmarkPost } = useStore();
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Filter posts that are in userBookmarks
  const savedPosts = posts.filter((post) => userBookmarks.includes(post.id));

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-electric/10 border border-cyan-electric/30 text-cyan-electric text-xs font-mono font-medium mb-3">
            <Bookmark className="w-3.5 h-3.5" />
            <span>SAVED KNOWLEDGE</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-content-primary tracking-tight">
            Saved Topics & Diagrams
          </h1>
          <p className="font-sans text-content-secondary text-sm sm:text-base mt-1.5 max-w-xl">
            Quickly reference and revisit the architecture diagrams and visual lessons you have bookmarked.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 bg-surface-card px-4 py-2 rounded-2xl border border-border shrink-0 font-mono text-xs">
          <span className="text-cyan-electric font-bold text-sm">{savedPosts.length}</span>
          <span className="text-content-secondary">
            {savedPosts.length === 1 ? 'Topic Bookmarked' : 'Topics Bookmarked'}
          </span>
        </div>
      </div>

      {/* Content Area */}
      {savedPosts.length === 0 ? (
        <div className="py-20 px-6 rounded-3xl bg-surface-card/60 border border-dashed border-border/80 text-center max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-electric/10 border border-cyan-electric/30 mx-auto flex items-center justify-center text-cyan-electric shadow-[0_0_30px_rgba(32,217,232,0.2)]">
            <Bookmark className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading font-bold text-xl text-content-primary">
              No saved topics yet
            </h3>
            <p className="font-sans text-xs sm:text-sm text-content-secondary max-w-md mx-auto leading-relaxed">
              When you find a diagram or visual lesson you want to revisit later, click the bookmark icon (🔖) on its card or inside the viewer to save it here.
            </p>
          </div>

          <button
            onClick={onExploreMore}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-brand to-cyan-electric text-content-primary font-heading font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-glow-brand inline-flex items-center gap-2"
          >
            <span>Explore All Topics</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {savedPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onOpenPost(post)}
              onMouseEnter={() => setHoveredCardId(post.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className="group relative rounded-2xl bg-surface-card border border-border hover:border-cyan-electric/70 transition-all duration-300 hover:shadow-[0_0_35px_rgba(32,217,232,0.2)] hover:-translate-y-1.5 flex flex-col overflow-hidden cursor-pointer"
            >
              {/* Card Image Area with In-Card Sliding Reel */}
              <div className="relative aspect-[16/10] bg-[#0A0E1A] overflow-hidden border-b border-border/80">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-black/20 to-black/30 pointer-events-none" />

                {/* Top Badges (Category & Step Count) */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                  <span className="px-2.5 py-1 rounded-lg bg-[#0B1020]/90 backdrop-blur-md border border-cyan-electric/40 text-[10px] font-mono text-cyan-electric font-semibold uppercase tracking-wider">
                    {post.category}
                  </span>

                  <span className="px-2 py-0.5 rounded-md bg-[#0B1020]/90 backdrop-blur-md border border-border text-[10px] font-mono text-content-primary flex items-center gap-1.5 shadow-sm">
                    <Layers className="w-3 h-3 text-lime-accent" />
                    <span>{post.stepsCount} diagrams</span>
                  </span>
                </div>

                {/* Sliding reel on hover */}
                <CardSlidingReel
                  slides={post.steps}
                  isHovered={hoveredCardId === post.id}
                  topicTitle={post.title}
                  onOpenSlide={(stepIdx) => onOpenPost(post, stepIdx)}
                />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-content-primary group-hover:text-cyan-electric transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="font-sans text-xs text-content-secondary line-clamp-2 mt-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-surface-elevated text-[10px] font-mono text-content-muted"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Row: Unsave Button & Open Action */}
                <div className="pt-3 border-t border-border flex items-center justify-between text-xs" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => toggleBookmarkPost(post.id)}
                    className="px-2.5 py-1 rounded-lg bg-surface-elevated hover:bg-accent-coral/20 border border-border hover:border-accent-coral text-content-secondary hover:text-accent-coral transition-colors flex items-center gap-1.5 text-xs font-mono"
                    title="Remove from saved"
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-cyan-electric text-cyan-electric" />
                    <span>Saved</span>
                  </button>

                  <button
                    onClick={() => onOpenPost(post)}
                    className="px-3 py-1.5 rounded-lg bg-brand/20 hover:bg-cyan-electric hover:text-black border border-cyan-electric/40 text-cyan-electric text-xs font-mono transition-all flex items-center gap-1"
                  >
                    <span>Open Study</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
