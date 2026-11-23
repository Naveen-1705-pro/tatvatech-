import React, { useState } from 'react';
import { 
  FolderHeart, 
  Layers, 
  Plus, 
  ArrowRight, 
  Lock, 
  Globe, 
  Heart, 
  Sparkles,
  BookOpen,
  Check
} from 'lucide-react';
import { Collection, TechCategory, Post } from '../../types';
import { useStore } from '../../lib/store';
import { CATEGORIES_LIST } from '../../data/mockData';

interface CollectionsHubProps {
  onOpenPost: (post: Post) => void;
}

export const CollectionsHub: React.FC<CollectionsHubProps> = ({ onOpenPost }) => {
  const { collections, createCollection, posts } = useStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TechCategory>('System Design');
  const [selectedPostIds, setSelectedPostIds] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createCollection(title, description, category, selectedPostIds);
    setTitle('');
    setDescription('');
    setSelectedPostIds([]);
    setIsCreateOpen(false);
  };

  const toggleSelectPost = (postId: string) => {
    setSelectedPostIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/20 border border-brand/50 text-cyan-electric text-xs font-mono font-medium mb-3">
            <FolderHeart className="w-3.5 h-3.5" />
            <span>CURATED LEARNING PATHS</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-content-primary tracking-tight">
            Visual Collections & Roadmaps
          </h2>
          <p className="font-sans text-content-secondary text-sm sm:text-base mt-2 max-w-xl">
            Multi-step learning tracks organized by topic experts and engineers.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-light text-content-primary font-heading font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-glow-brand transition-all hover:scale-105 active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Collection</span>
        </button>
      </div>

      {/* Grid of Visual Collection Libraries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((col) => {
          return (
            <div
              key={col.id}
              onClick={() => setSelectedCollection(col)}
              className="group rounded-3xl bg-surface-card border border-border hover:border-brand/70 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-card-elevated hover:-translate-y-1 cursor-pointer relative overflow-hidden"
            >
              {/* Stacked Cards Multi-Layer Visual Aesthetic */}
              <div className="relative w-full aspect-[16/9] mb-5">
                {/* Back card 2 */}
                <div className="absolute inset-x-6 -top-2.5 h-full rounded-2xl bg-[#141B33] border border-border/40 -z-20 group-hover:-top-3.5 transition-all duration-300" />
                {/* Back card 1 */}
                <div className="absolute inset-x-3 -top-1.5 h-full rounded-2xl bg-[#18203D] border border-border/60 -z-10 group-hover:-top-2 transition-all duration-300" />
                {/* Foreground Card with Real Diagram Image */}
                <div className="w-full h-full rounded-2xl bg-[#0F1527] border border-border overflow-hidden relative shadow-lg">
                  <img
                    src={col.coverImage}
                    alt={col.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-border text-[10px] font-mono text-cyan-electric font-semibold">
                    {col.posts.length} {col.posts.length === 1 ? 'Lesson' : 'Lessons'}
                  </div>
                </div>
              </div>

              {/* Title & Info */}
              <div className="space-y-2 mb-6">
                <span className="font-mono text-[10px] text-cyan-electric uppercase tracking-wider">
                  {col.category}
                </span>
                <h3 className="font-heading font-bold text-xl text-content-primary group-hover:text-cyan-electric transition-colors leading-snug">
                  {col.title}
                </h3>
                <p className="font-sans text-xs text-content-secondary line-clamp-2 leading-relaxed">
                  {col.description}
                </p>
              </div>

              {/* Creator & Read Action */}
              <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={col.creator.avatarUrl}
                    alt={col.creator.name}
                    className="w-6 h-6 rounded-lg object-cover"
                  />
                  <span className="font-mono text-[11px] text-content-secondary truncate max-w-[120px]">
                    {col.creator.name}
                  </span>
                </div>

                <span className="font-mono text-cyan-electric font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Open Library</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Collection Detail Modal / Drawer */}
      {selectedCollection && (
        <div className="fixed inset-0 z-50 bg-[#0B1020]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-surface-card border border-border rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs text-cyan-electric uppercase">
                  {selectedCollection.category}
                </span>
                <h3 className="font-heading font-bold text-2xl text-content-primary mt-1">
                  {selectedCollection.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-content-secondary mt-2">
                  {selectedCollection.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedCollection(null)}
                className="p-2 rounded-lg bg-surface-elevated text-content-secondary hover:text-content-primary"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase text-content-secondary tracking-wider">
                Lessons in this collection ({selectedCollection.posts.length})
              </h4>
              {selectedCollection.posts.map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedCollection(null);
                    onOpenPost(p);
                  }}
                  className="p-3.5 rounded-xl bg-surface-elevated border border-border hover:border-cyan-electric/50 cursor-pointer flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-surface-card font-mono text-xs flex items-center justify-center font-bold text-cyan-electric">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="font-heading font-semibold text-sm text-content-primary group-hover:text-cyan-electric">
                        {p.title}
                      </h5>
                      <span className="font-mono text-[10px] text-content-muted">
                        {p.stepsCount} steps • {p.readTimeMinutes} min
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-content-secondary group-hover:text-cyan-electric group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Collection Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B1020]/90 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="max-w-xl w-full bg-surface-card border border-border rounded-3xl p-6 sm:p-8 space-y-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-xl text-content-primary">
                Create New Visual Collection
              </h3>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="p-1.5 rounded-lg bg-surface-elevated text-content-secondary hover:text-content-primary"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono text-content-secondary uppercase mb-1">
                Collection Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Distributed Consensus from Scratch"
                className="w-full px-4 py-2 rounded-xl bg-surface-elevated border border-border text-sm text-content-primary focus:outline-none focus:border-cyan-electric font-heading font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-content-secondary uppercase mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A roadmap of visual steps..."
                className="w-full px-4 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-content-primary focus:outline-none focus:border-cyan-electric"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-content-secondary uppercase mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TechCategory)}
                className="w-full px-4 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-content-primary font-mono"
              >
                {CATEGORIES_LIST.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Lessons to include */}
            <div>
              <label className="block text-xs font-mono text-content-secondary uppercase mb-1">
                Select Initial Lessons ({selectedPostIds.length} selected)
              </label>
              <div className="max-h-40 overflow-y-auto space-y-1.5 p-2 rounded-xl bg-surface-elevated border border-border">
                {posts.map((post) => {
                  const isSelected = selectedPostIds.includes(post.id);
                  return (
                    <div
                      key={post.id}
                      onClick={() => toggleSelectPost(post.id)}
                      className={`p-2 rounded-lg cursor-pointer flex items-center justify-between text-xs transition-colors ${
                        isSelected ? 'bg-brand/20 text-cyan-electric border border-brand/50' : 'hover:bg-surface-card text-content-secondary'
                      }`}
                    >
                      <span className="truncate pr-2 font-heading">{post.title}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-cyan-electric shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="px-4 py-2 rounded-xl bg-surface-elevated text-xs font-mono text-content-secondary hover:text-content-primary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-brand hover:bg-brand-light text-content-primary text-xs font-heading font-semibold shadow-glow-brand"
              >
                Create Collection
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};
