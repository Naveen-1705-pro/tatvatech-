import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Clock, 
  TrendingUp, 
  User, 
  Hash, 
  FolderHeart 
} from 'lucide-react';
import { useStore } from '../../lib/store';
import { Post, TechCategory } from '../../types';

interface SearchModalProps {
  onOpenPost: (post: Post) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onOpenPost }) => {
  const { isSearchOpen, setIsSearchOpen, posts, creators, setActiveCategory } = useStore();
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Lessons' | 'Creators' | 'Tags'>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  const trendingQueries = [
    'Docker cgroups',
    'B+ Tree Indexing',
    'TLS 1.3 Handshake',
    'Dijkstra Graph',
    'Transformer Attention',
    'Virtual Memory',
    'Distributed Consensus',
  ];

  const recentSearches = [
    'Microservices architecture',
    'URL shortener system design',
    'Linux namespaces',
  ];

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  // Filter matching posts
  const lowerQuery = query.toLowerCase().trim();
  const matchedPosts = lowerQuery
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(lowerQuery) ||
          p.summary.toLowerCase().includes(lowerQuery) ||
          p.category.toLowerCase().includes(lowerQuery) ||
          p.tags.some((t) => t.toLowerCase().includes(lowerQuery)) ||
          p.creator.name.toLowerCase().includes(lowerQuery)
      )
    : [];

  // Filter matching creators
  const matchedCreators = lowerQuery
    ? Object.values(creators).filter(
        (c) =>
          c.name.toLowerCase().includes(lowerQuery) ||
          c.username.toLowerCase().includes(lowerQuery) ||
          c.bio.toLowerCase().includes(lowerQuery)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-[#0B1020]/90 backdrop-blur-xl flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-200">
      <div className="max-w-3xl w-full bg-surface-card border border-border shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-border flex items-center gap-3 bg-surface-elevated/80">
          <Search className="w-5 h-5 text-cyan-electric shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search concepts, algorithms, architecture diagrams, creators..."
            className="flex-1 bg-transparent text-sm sm:text-base text-content-primary placeholder-content-muted focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded hover:bg-surface-card text-content-secondary hover:text-content-primary"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 rounded-lg bg-surface-card border border-border text-xs font-mono text-content-secondary hover:text-content-primary"
          >
            Esc
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-5 py-2.5 bg-surface-card border-b border-border/60 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          {(['All', 'Lessons', 'Creators', 'Tags'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                selectedFilter === f
                  ? 'bg-brand/20 text-cyan-electric border border-brand/40 font-semibold'
                  : 'text-content-secondary hover:bg-surface-elevated hover:text-content-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Results / Suggestions Scrollable Content */}
        <div className="flex-1 p-5 overflow-y-auto space-y-6">
          {query.trim() === '' ? (
            /* Default State: Trending & Recent Searches */
            <div className="space-y-6">
              {/* Trending Tags & Concepts */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-content-secondary mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-accent-coral" />
                  <span>TRENDING KNOWLEDGE QUERIES</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingQueries.map((t) => (
                    <button
                      key={t}
                      onClick={() => setQuery(t)}
                      className="px-3 py-1.5 rounded-xl bg-surface-elevated hover:bg-brand/20 border border-border hover:border-brand/40 text-xs font-mono text-content-primary transition-all flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-cyan-electric" />
                      <span>{t}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-content-secondary mb-3">
                  <Clock className="w-3.5 h-3.5 text-accent-lime" />
                  <span>RECENT EXPLORATIONS</span>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((r) => (
                    <div
                      key={r}
                      onClick={() => setQuery(r)}
                      className="p-2.5 rounded-xl bg-surface-elevated/60 hover:bg-surface-elevated border border-border/60 hover:border-border cursor-pointer flex items-center justify-between text-xs text-content-secondary hover:text-content-primary transition-colors font-mono"
                    >
                      <span>{r}</span>
                      <ArrowRight className="w-3 h-3 text-content-muted" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Query Results State */
            <div className="space-y-6">
              {/* Matching Visual Lessons */}
              {(selectedFilter === 'All' || selectedFilter === 'Lessons') && (
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-content-secondary mb-3">
                    <span>MATCHING LESSONS ({matchedPosts.length})</span>
                  </div>

                  {matchedPosts.length === 0 ? (
                    <p className="text-xs text-content-secondary py-2">
                      No matching lessons found for "{query}".
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {matchedPosts.map((post) => (
                        <div
                          key={post.id}
                          onClick={() => {
                            setIsSearchOpen(false);
                            onOpenPost(post);
                          }}
                          className="p-3 rounded-xl bg-surface-elevated hover:bg-brand/20 border border-border hover:border-brand/50 cursor-pointer flex items-center justify-between group transition-all"
                        >
                          <div className="min-w-0 pr-4">
                            <span className="font-mono text-[10px] text-cyan-electric uppercase">
                              {post.category}
                            </span>
                            <h4 className="font-heading font-semibold text-sm text-content-primary group-hover:text-cyan-electric truncate">
                              {post.title}
                            </h4>
                            <p className="font-sans text-xs text-content-secondary line-clamp-1 mt-0.5">
                              {post.summary}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-mono text-[11px] text-content-muted hidden sm:inline">
                              {post.stepsCount} steps
                            </span>
                            <ArrowRight className="w-4 h-4 text-content-secondary group-hover:text-cyan-electric group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Matching Creators */}
              {(selectedFilter === 'All' || selectedFilter === 'Creators') && matchedCreators.length > 0 && (
                <div>
                  <div className="text-xs font-mono text-content-secondary mb-3">
                    CREATORS ({matchedCreators.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchedCreators.map((c) => (
                      <div
                        key={c.id}
                        className="p-3 rounded-xl bg-surface-elevated border border-border flex items-center gap-3"
                      >
                        <img
                          src={c.avatarUrl}
                          alt={c.name}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                          <h5 className="font-heading font-semibold text-xs text-content-primary truncate">
                            {c.name}
                          </h5>
                          <span className="font-mono text-[10px] text-content-secondary">
                            @{c.username}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
