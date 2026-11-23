import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  Trophy, 
  MessageSquare, 
  Heart, 
  ArrowRight, 
  ShieldCheck, 
  Share2, 
  Flag,
  Github,
  Linkedin,
  Instagram
} from 'lucide-react';
import { CREATORS, WEEKLY_CHALLENGE } from '../../data/mockData';
import { useStore } from '../../lib/store';
import { Post } from '../../types';

interface CommunityViewProps {
  onOpenPost: (post: Post) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ onOpenPost }) => {
  const { posts, toggleFollowCreator, followedCreators } = useStore();
  const [reportSuccess, setReportSuccess] = useState<string | null>(null);

  const handleReport = (itemId: string) => {
    setReportSuccess(itemId);
    setTimeout(() => setReportSuccess(null), 2500);
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/20 border border-brand/50 text-cyan-electric text-xs font-mono font-medium">
          <Users className="w-3.5 h-3.5" />
          <span>COLLABORATIVE MINDS</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-content-primary tracking-tight">
          The NEXORA Guild
        </h2>
        <p className="font-sans text-content-secondary text-sm sm:text-base">
          A focused community of engineers, architects, and educators illustrating the underlying mechanisms of technology.
        </p>
      </div>

      {/* Weekly Visual Challenge Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-surface-card via-[#161D36] to-surface-card border border-brand/40 p-6 sm:p-10 shadow-card-elevated flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-accent-coral/20 border border-accent-coral/40 text-accent-coral text-xs font-mono font-bold flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              ACTIVE VISUAL CHALLENGE
            </span>
            <span className="text-content-secondary font-mono text-xs">•</span>
            <span className="text-accent-lime font-mono text-xs">
              {WEEKLY_CHALLENGE.deadline}
            </span>
          </div>

          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-content-primary">
            {WEEKLY_CHALLENGE.title}
          </h3>

          <p className="font-sans text-sm text-content-secondary leading-relaxed">
            {WEEKLY_CHALLENGE.prompt}
          </p>

          <p className="font-mono text-xs text-cyan-electric">
            Prize: {WEEKLY_CHALLENGE.prizeText}
          </p>
        </div>

        <button 
          onClick={() => alert("Submit your visual diagrams via the 'Create' studio in the top navigation bar!")}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand to-cyan-electric text-content-primary font-heading font-semibold text-sm shadow-glow-brand hover:scale-105 active:scale-95 transition-all shrink-0"
        >
          Submit Visual Story
        </button>
      </div>

      {/* Top Visual Architects Leaderboard */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="font-heading font-bold text-xl text-content-primary">
            Top Knowledge Architects
          </h3>
          <span className="font-mono text-xs text-content-secondary">
            Ranked by community impact & diagram clarity
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(CREATORS).map((creator, idx) => {
            const isFollowed = followedCreators.includes(creator.id);

            return (
              <div
                key={creator.id}
                className="rounded-2xl bg-surface-card border border-border p-6 flex flex-col justify-between space-y-4 hover:border-brand/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={creator.avatarUrl}
                      alt={creator.name}
                      className="w-12 h-12 rounded-xl object-cover object-center border border-cyan-electric/40 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-heading font-bold text-base text-content-primary">
                          {creator.name}
                        </h4>
                        {creator.verified && (
                          <ShieldCheck className="w-4 h-4 text-cyan-electric" />
                        )}
                      </div>
                      <span className="font-mono text-xs text-cyan-electric">
                        @{creator.username}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-content-muted font-bold">
                    #{idx + 1}
                  </span>
                </div>

                <p className="font-sans text-xs text-content-secondary leading-relaxed line-clamp-2">
                  {creator.bio}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {creator.expertise.map((exp) => (
                    <span
                      key={exp}
                      className="px-2 py-0.5 rounded-md bg-surface-elevated text-[10px] font-mono text-content-secondary"
                    >
                      {exp}
                    </span>
                  ))}
                </div>

                {/* Creator Social Links */}
                {(creator.github || creator.linkedin || creator.instagram) && (
                  <div className="flex items-center gap-2 pt-1">
                    {creator.github && (
                      <a
                        href={creator.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-surface-elevated hover:bg-cyan-electric/20 border border-border hover:border-cyan-electric text-content-secondary hover:text-cyan-electric transition-colors"
                        title="GitHub"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {creator.linkedin && (
                      <a
                        href={creator.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-surface-elevated hover:bg-cyan-electric/20 border border-border hover:border-cyan-electric text-content-secondary hover:text-cyan-electric transition-colors"
                        title="LinkedIn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {creator.instagram && (
                      <a
                        href={creator.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-surface-elevated hover:bg-accent-coral/20 border border-border hover:border-accent-coral text-content-secondary hover:text-accent-coral transition-colors"
                        title="Instagram"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono">
                  <span className="text-content-secondary">
                    {creator.followersCount.toLocaleString()} followers
                  </span>

                  <button
                    onClick={() => toggleFollowCreator(creator.id)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      isFollowed
                        ? 'bg-surface-elevated border border-border text-content-secondary'
                        : 'bg-brand hover:bg-brand-light text-content-primary font-semibold shadow-glow-brand'
                    }`}
                  >
                    {isFollowed ? 'Following' : 'Follow'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
