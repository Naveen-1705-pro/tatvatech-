import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  Trophy, 
  ArrowRight, 
  Users, 
  Play, 
  Flame, 
  Compass, 
  CheckCircle,
  Clock
} from 'lucide-react';
import { DAILY_CONCEPT, WEEKLY_CHALLENGE, CREATORS } from '../../data/mockData';
import { useStore } from '../../lib/store';
import { NetworksIllustration } from '../brand/CategoryIllustrations';
import { Post } from '../../types';

interface DailyDiscoveryProps {
  onOpenPost: (post: Post) => void;
}

export const DailyDiscovery: React.FC<DailyDiscoveryProps> = ({ onOpenPost }) => {
  const { posts, readingProgress, toggleFollowCreator, followedCreators } = useStore();

  // Find daily concept post
  const dailyPost = posts.find((p) => p.id === DAILY_CONCEPT.postId) || posts[2];

  // In-progress posts
  const inProgressPostIds = Object.keys(readingProgress);
  const inProgressPosts = posts.filter(
    (p) => inProgressPostIds.includes(p.id) && readingProgress[p.id] < p.stepsCount
  );

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* 1. Continue Exploring (if any lessons in progress) */}
      {inProgressPosts.length > 0 && (
        <div className="p-6 rounded-2xl bg-surface-card border border-brand/40 shadow-card-elevated">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-electric" />
              <h3 className="font-heading font-bold text-base text-content-primary">
                Continue Exploring
              </h3>
            </div>
            <span className="font-mono text-xs text-content-secondary">
              Pick up where you left off
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgressPosts.map((post) => {
              const currentStep = readingProgress[post.id] || 1;
              const percent = Math.round((currentStep / post.stepsCount) * 100);

              return (
                <div
                  key={post.id}
                  onClick={() => onOpenPost(post)}
                  className="p-4 rounded-xl bg-surface-elevated border border-border hover:border-cyan-electric/50 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="min-w-0 pr-3">
                    <span className="font-mono text-[10px] text-cyan-electric font-semibold uppercase">
                      {post.category}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-content-primary truncate group-hover:text-cyan-electric">
                      {post.title}
                    </h4>
                    <div className="w-32 h-1.5 bg-surface-card rounded-full mt-2 overflow-hidden border border-border/50">
                      <div
                        className="h-full bg-gradient-to-r from-brand to-cyan-electric"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-content-muted mt-1 block">
                      Step {currentStep} of {post.stepsCount} ({percent}%)
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-brand/20 group-hover:bg-brand text-cyan-electric group-hover:text-content-primary transition-all shrink-0">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Grid with Daily Concept & Weekly Visual Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Daily Visual Discovery (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-surface-card via-[#131B32] to-surface-card border border-border p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-cyan-electric/15 border border-cyan-electric/30 text-cyan-electric font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {DAILY_CONCEPT.date}
              </span>
              <span className="text-content-secondary font-mono text-xs">•</span>
              <span className="text-content-secondary font-mono text-xs">
                {DAILY_CONCEPT.category}
              </span>
            </div>

            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-content-primary leading-snug">
              {DAILY_CONCEPT.title}
            </h3>

            <p className="font-sans text-sm text-content-secondary leading-relaxed">
              {DAILY_CONCEPT.explanation}
            </p>

            {/* Authentic Diagram / Custom Stage */}
            <div className="w-full aspect-[16/8] rounded-xl bg-[#090D1A] border border-border/80 overflow-hidden relative flex items-center justify-center">
              {dailyPost?.coverImage ? (
                <img
                  src={dailyPost.coverImage}
                  alt={DAILY_CONCEPT.title}
                  className="w-full h-full object-cover object-center filter drop-shadow-lg"
                />
              ) : (
                <NetworksIllustration className="w-full h-full object-contain filter drop-shadow-lg p-4" />
              )}
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs text-content-secondary">
              <span className="w-2 h-2 rounded-full bg-accent-lime" />
              <span>Full 5-phase interactive breakdown</span>
            </div>

            <button
              onClick={() => onOpenPost(dailyPost)}
              className="px-4 py-2 rounded-xl bg-brand hover:bg-brand-light text-content-primary font-heading font-semibold text-xs flex items-center gap-1.5 transition-all shadow-glow-brand"
            >
              <span>Explore Concept</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Weekly Visual Challenge & Featured Creators (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Weekly Challenge Card */}
          <div className="rounded-3xl bg-surface-card border border-border p-6 sm:p-7 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-accent-coral/15 border border-accent-coral/30 text-accent-coral font-mono text-xs font-semibold uppercase flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" />
                WEEKLY CHALLENGE
              </span>
              <span className="text-content-muted font-mono text-xs">
                {WEEKLY_CHALLENGE.deadline}
              </span>
            </div>

            <h4 className="font-heading font-bold text-lg text-content-primary">
              {WEEKLY_CHALLENGE.title}
            </h4>

            <p className="font-sans text-xs text-content-secondary leading-relaxed">
              {WEEKLY_CHALLENGE.prompt}
            </p>

            <div className="p-3 rounded-xl bg-surface-elevated border border-border/60 text-xs font-mono text-content-secondary flex items-center justify-between">
              <span className="text-content-primary font-medium">{WEEKLY_CHALLENGE.participantsCount} Architects Submitted</span>
              <span className="text-cyan-electric font-semibold">Join Challenge →</span>
            </div>
          </div>

          {/* Featured Creators Showcase */}
          <div className="flex-1 rounded-3xl bg-surface-card border border-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-electric" />
                <h4 className="font-heading font-bold text-sm text-content-primary">
                  Featured Storytellers
                </h4>
              </div>
              <span className="font-mono text-xs text-content-secondary">
                Verified Experts
              </span>
            </div>

            <div className="space-y-3">
              {Object.values(CREATORS).slice(0, 3).map((creator) => {
                const isFollowed = followedCreators.includes(creator.id);
                return (
                  <div
                    key={creator.id}
                    className="p-3 rounded-xl bg-surface-elevated border border-border flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={creator.avatarUrl}
                        alt={creator.name}
                        className="w-9 h-9 rounded-xl object-cover border border-border"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-heading font-bold text-xs text-content-primary">
                            {creator.name}
                          </span>
                          {creator.verified && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-electric" />
                          )}
                        </div>
                        <span className="font-mono text-[10px] text-content-secondary">
                          {creator.expertise[0]} • {creator.followersCount.toLocaleString()} followers
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleFollowCreator(creator.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                        isFollowed
                          ? 'bg-surface-card border border-border text-content-secondary'
                          : 'bg-brand hover:bg-brand-light text-content-primary font-semibold shadow-glow-brand'
                      }`}
                    >
                      {isFollowed ? 'Following' : 'Follow'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
