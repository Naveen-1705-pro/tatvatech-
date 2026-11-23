import React, { useState } from 'react';
import { 
  Bookmark, 
  Layers, 
  FileEdit, 
  FolderHeart, 
  Users, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  Trash2,
  Play,
  MessageSquarePlus,
  Star,
  ShieldCheck,
  Github,
  Linkedin,
  Instagram,
  Flame,
  MapPin
} from 'lucide-react';
import { useStore } from '../../lib/store';
import { Post } from '../../types';

interface PersonalDashboardProps {
  onOpenPost: (post: Post) => void;
  onOpenStudioWithDraft?: (draft: Partial<Post>) => void;
}

export const PersonalDashboard: React.FC<PersonalDashboardProps> = ({ 
  onOpenPost,
  onOpenStudioWithDraft
}) => {
  const { 
    posts, 
    userBookmarks, 
    drafts, 
    followedCreators, 
    creators, 
    readingProgress,
    openCreatorStudio,
    isOwner,
    feedbackList,
    switchRole
  } = useStore();

  const [activeTab, setActiveTab] = useState<'bookmarks' | 'published' | 'drafts' | 'progress' | 'following' | 'feedback'>(
    isOwner ? 'published' : 'bookmarks'
  );

  // Bookmarked posts
  const bookmarkedPosts = posts.filter((p) => userBookmarks.includes(p.id));

  // Published posts created by current user
  const publishedByUser = posts.filter((p) => p.creator.id === 'c-you' || p.creator.username === 'alexsystems');

  // In-progress posts
  const inProgressPosts = posts.filter((p) => readingProgress[p.id]);

  // Followed creator objects
  const followedList = Object.values(creators).filter((c) => followedCreators.includes(c.id));

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Dashboard Editorial Header */}
      <div className="p-6 sm:p-10 rounded-3xl bg-surface-card border border-border relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-5">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-brand to-cyan-electric p-1 shadow-glow-brand shrink-0">
            <img
              src="/images/author/naveen_techie_avatar.svg"
              alt="Naveen Solanki"
              className="w-full h-full rounded-[14px] object-cover object-center"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-content-primary">
                {isOwner ? 'Naveen Solanki' : 'Your Knowledge Sanctum'}
              </h2>
              <span className="w-2 h-2 rounded-full bg-accent-lime shadow-[0_0_8px_#B5F36A]" />
            </div>
            <p className="font-mono text-xs sm:text-sm text-cyan-electric mt-1 flex items-center gap-2">
              <span>{isOwner ? 'suman0383solanki@gmail.com • Platform Author' : '@nexora_explorer • Visual Architect'}</span>
              {isOwner && (
                <>
                  <span className="text-content-muted">•</span>
                  <span className="text-content-secondary flex items-center gap-1 text-[11px]">
                    <MapPin className="w-3 h-3 text-accent-coral" />
                    <span>Greater Noida, India</span>
                  </span>
                </>
              )}
            </p>

            {/* Author Social Profile Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-2.5">
              <a
                href="https://github.com/Naveen-1705-pro"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-surface-elevated hover:bg-cyan-electric/20 border border-border hover:border-cyan-electric text-content-secondary hover:text-cyan-electric text-[11px] font-mono transition-colors flex items-center gap-1.5"
                title="GitHub: Naveen-1705-pro"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/naveen-solanki-6a6434301?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-surface-elevated hover:bg-cyan-electric/20 border border-border hover:border-cyan-electric text-content-secondary hover:text-cyan-electric text-[11px] font-mono transition-colors flex items-center gap-1.5"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/self_loop_naveen/"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-surface-elevated hover:bg-accent-coral/20 border border-border hover:border-accent-coral text-content-secondary hover:text-accent-coral text-[11px] font-mono transition-colors flex items-center gap-1.5"
                title="Instagram: @self_loop_naveen"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs font-mono text-content-secondary">
              <span>{bookmarkedPosts.length} Saved</span>
              <span>•</span>
              <span>{publishedByUser.length} Published</span>
              <span>•</span>
              <span>{followedList.length} Following</span>
            </div>
          </div>
        </div>

        <div className="px-4 py-2 rounded-xl bg-surface-elevated border border-border text-xs font-mono text-cyan-electric flex items-center gap-2 self-start md:self-auto shrink-0">
          <ShieldCheck className="w-4 h-4 text-accent-lime" />
          <span>Code-Managed Topics</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-border pb-3 overflow-x-auto scrollbar-none text-xs sm:text-sm font-mono">
        {[
          ...(isOwner ? [{ id: 'published', label: `My Topics (${publishedByUser.length})`, icon: Layers }] : []),
          ...(isOwner ? [{ id: 'feedback', label: `Reader Feedback (${feedbackList.length})`, icon: MessageSquarePlus }] : []),
          { id: 'bookmarks', label: `Saved Lessons (${bookmarkedPosts.length})`, icon: Bookmark },
          { id: 'progress', label: `Reading Progress (${inProgressPosts.length})`, icon: Clock },
          ...(isOwner ? [{ id: 'drafts', label: `Drafts (${drafts.length})`, icon: FileEdit }] : []),
          { id: 'following', label: `Following (${followedList.length})`, icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
                isActive
                  ? 'bg-brand/20 border border-brand/50 text-cyan-electric font-semibold'
                  : 'text-content-secondary hover:text-content-primary hover:bg-surface-card'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Bookmarked Lessons */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-6">
          {bookmarkedPosts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-surface-card border border-border text-content-secondary text-sm">
              <Bookmark className="w-8 h-8 text-cyan-electric mx-auto mb-3 opacity-60" />
              <p>No saved lessons yet. Explore the feed and bookmark diagrams you want to revisit!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => onOpenPost(post)}
                  className="rounded-2xl bg-surface-card border border-border hover:border-brand/60 cursor-pointer p-5 transition-all hover:shadow-card-elevated hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="aspect-[16/9] rounded-xl bg-[#090D1A] overflow-hidden mb-4 border border-border">
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-cyan-electric uppercase">
                      {post.category}
                    </span>
                    <h4 className="font-heading font-bold text-base text-content-primary mt-1 line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="font-sans text-xs text-content-secondary line-clamp-2 mt-1">
                      {post.summary}
                    </p>
                  </div>
                  <div className="pt-3 mt-4 border-t border-border flex items-center justify-between text-xs font-mono text-content-muted">
                    <span>{post.stepsCount} steps</span>
                    <span className="text-cyan-electric font-semibold">Revisit →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Reading Progress */}
      {activeTab === 'progress' && (
        <div className="space-y-4">
          {inProgressPosts.map((post) => {
            const step = readingProgress[post.id] || 1;
            const percent = Math.round((step / post.stepsCount) * 100);

            return (
              <div
                key={post.id}
                onClick={() => onOpenPost(post)}
                className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-border hover:border-cyan-electric/50 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
              >
                <div className="space-y-1 min-w-0">
                  <span className="font-mono text-[10px] text-cyan-electric uppercase">
                    {post.category}
                  </span>
                  <h4 className="font-heading font-bold text-base text-content-primary truncate">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-48 h-2 bg-surface-elevated rounded-full overflow-hidden border border-border">
                      <div
                        className="h-full bg-gradient-to-r from-brand to-cyan-electric"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-content-secondary">
                      Step {step} of {post.stepsCount} ({percent}%)
                    </span>
                  </div>
                </div>

                <button className="px-4 py-2 rounded-xl bg-surface-elevated hover:bg-brand text-xs font-mono text-cyan-electric hover:text-content-primary transition-all flex items-center gap-1.5 self-start sm:self-auto shrink-0">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume Lesson</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Published by User */}
      {activeTab === 'published' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedByUser.map((post) => (
              <div
                key={post.id}
                onClick={() => onOpenPost(post)}
                className="rounded-2xl bg-surface-card border border-border hover:border-brand/60 cursor-pointer p-5 transition-all flex flex-col justify-between"
              >
                <div className="aspect-[16/9] rounded-xl bg-[#090D1A] overflow-hidden mb-4 border border-border">
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-content-primary">
                    {post.title}
                  </h4>
                  <p className="font-sans text-xs text-content-secondary line-clamp-2 mt-1">
                    {post.summary}
                  </p>
                </div>
                <div className="pt-3 mt-4 border-t border-border flex items-center justify-between text-xs font-mono text-content-secondary">
                  <span>{post.viewsCount} views</span>
                  <span>{post.likesCount} likes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Drafts */}
      {activeTab === 'drafts' && (
        <div className="space-y-4">
          {drafts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-surface-card border border-border text-content-secondary text-sm">
              <FileEdit className="w-8 h-8 text-brand-light mx-auto mb-3 opacity-60" />
              <p>No unpublished drafts. Use the Creator Studio to start drafting your next visual concept.</p>
            </div>
          ) : (
            drafts.map((d, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-border flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-heading font-bold text-base text-content-primary">
                    {d.title || 'Untitled Draft'}
                  </h4>
                  <p className="font-mono text-xs text-content-muted mt-0.5">
                    {d.category || 'System Design'} • {d.steps?.length || 0} steps
                  </p>
                </div>

                <button
                  onClick={() => openCreatorStudio(d)}
                  className="px-4 py-2 rounded-xl bg-brand/20 hover:bg-brand text-xs font-mono text-cyan-electric hover:text-content-primary transition-colors"
                >
                  Edit in Studio →
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Reader Feedback (Author Only) */}
      {activeTab === 'feedback' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-content-primary">
              Reader Feedback & Topic Requests ({feedbackList.length})
            </h3>
            <span className="font-mono text-xs text-cyan-electric">
              Suggestions submitted by visitors
            </span>
          </div>

          {feedbackList.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-surface-card border border-border text-content-secondary text-sm">
              <MessageSquarePlus className="w-8 h-8 text-cyan-electric mx-auto mb-3 opacity-60" />
              <p>No feedback submitted yet. As visitors read your visual lessons, their topic requests and notes will show up here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feedbackList.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-surface-card border border-border space-y-3 shadow-sm hover:border-brand/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-electric/15 border border-cyan-electric/30 text-cyan-electric font-mono text-[10px] uppercase font-semibold">
                      {item.type.replace('_', ' ')}
                    </span>
                    <span className="font-mono text-[10px] text-content-muted">
                      {item.createdAt}
                    </span>
                  </div>

                  {item.targetPostTitle && (
                    <div className="text-xs font-mono text-accent-lime">
                      Requested Concept: <strong>{item.targetPostTitle}</strong>
                    </div>
                  )}

                  <p className="font-sans text-xs sm:text-sm text-content-primary leading-relaxed">
                    "{item.message}"
                  </p>

                  <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-mono text-content-secondary text-[11px]">
                      <span>{item.name}</span>
                      {item.email && <span className="text-content-muted">({item.email})</span>}
                    </div>

                    {item.rating && (
                      <div className="flex items-center gap-0.5 text-accent-lime">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Following */}
      {activeTab === 'following' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {followedList.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl bg-surface-card border border-border flex items-center gap-3.5"
            >
              <img
                src={c.avatarUrl}
                alt={c.name}
                className="w-12 h-12 rounded-xl object-cover border border-border"
              />
              <div className="min-w-0">
                <h5 className="font-heading font-bold text-sm text-content-primary truncate">
                  {c.name}
                </h5>
                <span className="font-mono text-xs text-cyan-electric block">
                  @{c.username}
                </span>
                <span className="font-mono text-[10px] text-content-muted">
                  {c.lessonsCount} visual lessons
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
