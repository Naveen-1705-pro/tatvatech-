import React from 'react';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import { TechCategory } from '../../types';
import { CATEGORIES_LIST } from '../../data/mockData';
import { useStore } from '../../lib/store';

interface TechExplorerProps {
  onSelectCategory: (category: TechCategory) => void;
}

export const TechExplorer: React.FC<TechExplorerProps> = ({ onSelectCategory }) => {
  const { posts } = useStore();
  const activeDomains = CATEGORIES_LIST.filter((cat) => cat.count > 0);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-electric/10 border border-cyan-electric/30 text-cyan-electric text-xs font-mono font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INTERACTIVE ATLAS</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-content-primary tracking-tight">
          Explore the world of technology.
        </h2>
        <p className="font-sans text-content-secondary text-base sm:text-lg">
          Every complex idea has a visual story. Discover curated architectural diagrams and visual lessons.
        </p>
      </div>

      {/* Grid of Domain Cards showcasing REAL DIAGRAMS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {activeDomains.map((cat, idx) => {
          const samplePost = posts.find((p) => p.category === cat.name);

          return (
            <div
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className="group relative rounded-2xl bg-surface-card border border-border hover:border-cyan-electric/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(32,217,232,0.15)] hover:-translate-y-1.5 flex flex-col overflow-hidden cursor-pointer p-6"
            >
              {/* Top Row: Category Name & Count */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="font-mono text-[10px] text-cyan-electric uppercase tracking-wider block mb-1">
                    DOMAIN 0{idx + 1}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-content-primary group-hover:text-cyan-electric transition-colors leading-snug">
                    {cat.name}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-surface-elevated border border-border font-mono text-xs text-content-secondary group-hover:text-content-primary shrink-0">
                  {cat.count} topics
                </span>
              </div>

              {/* Short Description */}
              <p className="font-sans text-xs text-content-secondary leading-relaxed mb-5">
                {cat.shortDesc}
              </p>

              {/* Authentic Diagram Preview */}
              <div className="w-full aspect-[16/10] rounded-xl bg-[#090D1A] border border-border/80 overflow-hidden relative group-hover:border-cyan-electric/40 transition-colors">
                {samplePost?.coverImage ? (
                  <img
                    src={samplePost.coverImage}
                    alt={cat.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-mono text-content-muted">
                    Diagram Collection
                  </div>
                )}
                
                {/* Corner Accents */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan-electric/40" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-brand/40" />
              </div>

              {/* Sub-topics pills */}
              <div className="flex flex-wrap gap-1.5 mt-5 mb-2">
                {cat.topics.slice(0, 4).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-0.5 rounded-md bg-surface-elevated border border-border/60 text-[10px] font-mono text-content-secondary"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Bottom Explore Trigger */}
              <div className="pt-4 mt-auto border-t border-border flex items-center justify-between text-xs font-mono text-cyan-electric group-hover:text-content-primary transition-colors">
                <span className="font-semibold">Explore Domain</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
