import React, { useState } from 'react';
import { 
  Heart, 
  Bookmark, 
  Layers, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { Post, TechCategory } from '../../types';
import { useStore } from '../../lib/store';
import { CardSlidingReel } from '../common/CardSlidingReel';

interface VisualFeedProps {
  onOpenPost: (post: Post, initialStepIndex?: number) => void;
  onOpenAuthor?: () => void;
}

export const VisualFeed: React.FC<VisualFeedProps> = ({ onOpenPost, onOpenAuthor }) => {
  const { 
    posts, 
    activeCategory, 
    setActiveCategory, 
    toggleLikePost, 
    toggleBookmarkPost,
    userLikes,
    userBookmarks
  } = useStore();

  const [activeFilterTab, setActiveFilterTab] = useState<'All' | 'Trending' | 'Popular'>('All');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Filter posts by category and sort tab
  const filteredPosts = posts
    .filter((post) => {
      if (activeCategory === 'All') return true;
      return post.category === activeCategory;
    })
    .sort((a, b) => {
      if (activeFilterTab === 'Trending') return b.viewsCount - a.viewsCount;
      if (activeFilterTab === 'Popular') return b.likesCount - a.likesCount;
      return 0; // Default order
    });

  const categoriesTabList: Array<TechCategory | 'All'> = [
    'All',
    'Data Structures & Algorithms',
    'System Design',
    'Docker & DevOps',
    'Operating Systems',
    'DBMS',
    'Computer Networks',
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/15 border border-brand/40 text-cyan-electric text-xs font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VISUAL DISCOVERY FEED</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-content-primary tracking-tight">
            Ideas worth exploring.
          </h2>
          <p className="font-sans text-content-secondary text-sm sm:text-base mt-2 max-w-xl">
            Discover visual explanations that make technology easier to understand.
          </p>
        </div>

        {/* Filter Tabs (All, Trending, Popular) */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-card border border-border">
          {(['All', 'Trending', 'Popular'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilterTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeFilterTab === tab
                  ? 'bg-brand text-content-primary shadow-glow-brand'
                  : 'text-content-secondary hover:text-content-primary hover:bg-surface-elevated'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills Scroller */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categoriesTabList.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 border shrink-0 ${
                isActive
                  ? 'bg-cyan-electric/20 border-cyan-electric text-cyan-electric shadow-glow-cyan font-semibold'
                  : 'bg-surface-card border-border hover:border-brand/50 text-content-secondary hover:text-content-primary'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Editorial Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPosts.map((post, idx) => {
          const isLiked = userLikes.includes(post.id);
          const isBookmarked = userBookmarks.includes(post.id);
          const isSpanTwo = idx === 0 || idx === 4;

          return (
            <article
              key={post.id}
              onClick={() => onOpenPost(post)}
              onMouseEnter={() => setHoveredCardId(post.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className={`group relative rounded-2xl bg-surface-card border border-border hover:border-cyan-electric/70 transition-all duration-300 hover:shadow-[0_0_35px_rgba(32,217,232,0.2)] hover:-translate-y-1.5 flex flex-col overflow-hidden cursor-pointer ${
                isSpanTwo ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Card Image Area with ONLY REAL DIAGRAM IMAGE & Visible In-Card Sliding Reel on Hover */}
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

                {/* Hover prompt hint */}
                <div className="absolute bottom-2.5 right-3 z-10 pointer-events-none">
                  <span className="text-[10px] font-mono text-cyan-electric/90 bg-black/75 px-2 py-0.5 rounded-md border border-cyan-electric/40 backdrop-blur-xs flex items-center gap-1 group-hover:opacity-0 transition-opacity">
                    <span>Hover to preview slides</span>
                  </span>
                </div>

                {/* Beautiful in-card sliding reel with clear attractive borders */}
                <CardSlidingReel
                  slides={post.steps}
                  isHovered={hoveredCardId === post.id}
                  topicTitle={post.title}
                  onOpenSlide={(stepIdx) => onOpenPost(post, stepIdx)}
                />
              </div>

              {/* Card Content Information */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-content-primary group-hover:text-cyan-electric transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-content-secondary line-clamp-2 mt-2 leading-relaxed">
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

                {/* Creator Footer & Interactive Buttons */}
                <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                  {/* Creator */}
                  <div 
                    className="flex items-center gap-2.5 cursor-pointer group/creator"
                    onClick={(e) => {
                      if (onOpenAuthor) {
                        e.stopPropagation();
                        onOpenAuthor();
                      }
                    }}
                    title="View Naveen Solanki's profile"
                  >
                    <div className="w-6 h-6 rounded-lg overflow-hidden border border-cyan-electric/50 shrink-0 group-hover/creator:scale-110 transition-transform shadow-[0_0_8px_rgba(32,217,232,0.4)]">
                      <img
                        src="/images/author/naveen_techie_avatar.svg"
                        alt={post.creator.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-heading font-semibold text-content-primary text-xs leading-none group-hover/creator:text-cyan-electric transition-colors">
                        {post.creator.name}
                      </span>
                      <span className="font-mono text-[10px] text-content-muted mt-0.5">
                        Platform Author
                      </span>
                    </div>
                  </div>

                  {/* Actions (Like & Bookmark) */}
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => toggleLikePost(post.id)}
                      className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1 font-mono text-[11px] ${
                        isLiked
                          ? 'bg-accent-coral/20 border-accent-coral text-accent-coral'
                          : 'bg-surface-elevated border-border text-content-secondary hover:text-content-primary'
                      }`}
                      title="Like"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-accent-coral' : ''}`} />
                      <span>{post.likesCount}</span>
                    </button>

                    <button
                      onClick={() => toggleBookmarkPost(post.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isBookmarked
                          ? 'bg-cyan-electric/20 border-cyan-electric text-cyan-electric'
                          : 'bg-surface-elevated border-border text-content-secondary hover:text-content-primary'
                      }`}
                      title="Bookmark"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-cyan-electric' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
