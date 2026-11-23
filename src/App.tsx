import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Plus, 
  Compass, 
  Layers, 
  BookOpen, 
  Terminal,
  Activity,
  Code2,
  X
} from 'lucide-react';
import { StoreProvider, useStore } from './lib/store';
import { Navbar } from './components/navigation/Navbar';
import { KnowledgeUniverse } from './components/hero/KnowledgeUniverse';
import { TechExplorer } from './components/explorer/TechExplorer';
import { VisualFeed } from './components/feed/VisualFeed';
import { FeaturedLesson } from './components/feed/FeaturedLesson';
import { CommunityView } from './components/community/CommunityView';
import { PersonalDashboard } from './components/dashboard/PersonalDashboard';
import { SavedSection } from './components/saved/SavedSection';
import { AuthorProfilePage } from './components/author/AuthorProfilePage';
import { ImmersiveViewer } from './components/viewer/ImmersiveViewer';
import { CreatorStudio } from './components/studio/CreatorStudio';
import { SearchModal } from './components/search/SearchModal';
import { OwnerAuthModal } from './components/auth/OwnerAuthModal';
import { AuthModal } from './components/auth/AuthModal';
import { FeedbackModal } from './components/feedback/FeedbackModal';
import { Footer } from './components/footer/Footer';
import { Post, TechCategory } from './types';

const MainApp: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'explore' | 'topics' | 'author' | 'community' | 'dashboard' | 'saved'>('explore');
  const { 
    posts, 
    activePostForViewing, 
    activePostInitialStep,
    closePostViewer, 
    openPostViewer,
    isCreatorStudioOpen, 
    closeCreatorStudio,
    openCreatorStudio,
    setActiveCategory,
    authorOtpState,
    clearAuthorOtpAlert,
    isOwnerAuthModalOpen,
    setIsOwnerAuthModalOpen
  } = useStore();

  const featuredPost = posts.find((p) => p.isFeatured) || posts[0];

  const handleSelectCategoryFromUniverse = (category: TechCategory) => {
    setActiveCategory(category);
    setCurrentTab('topics');
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-content-primary flex flex-col font-sans selection:bg-brand/40 selection:text-cyan-electric">
      {/* Top Translucent Navbar */}
      <Navbar currentTab={currentTab} onSelectTab={(tab) => setCurrentTab(tab as any)} />

      {/* Main Content Areas based on selected tab */}
      <main className="flex-1 pt-20 sm:pt-24">
        {currentTab === 'explore' && (
          <>
            {/* HERO SECTION */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 sm:py-20 lg:py-24 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                {/* Left Side: Spacious Editorial Layout */}
                <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10">
                  {/* Small Label */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card border border-border/80 text-cyan-electric font-mono text-xs font-semibold uppercase tracking-widest shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-cyan-electric animate-pulse" />
                    <span>THE VISUAL KNOWLEDGE UNIVERSE</span>
                  </div>

                  {/* Main Headline */}
                  <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-[68px] leading-[1.08] tracking-tight text-content-primary">
                    Complex ideas.{' '}
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand via-brand-light to-cyan-electric">
                      Beautifully understood.
                    </span>
                  </h1>

                  {/* Supporting Description */}
                  <p className="font-sans text-content-secondary text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl">
                    Discover visual explanations, technical diagrams, and ideas shared by people who love understanding how technology works.
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                    <button
                      onClick={() => {
                        const feedSection = document.getElementById('discovery-feed');
                        feedSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand to-cyan-electric hover:shadow-glow-cyan text-content-primary font-heading font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 shadow-glow-brand"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Explore Knowledge</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setCurrentTab('topics')}
                      className="px-6 py-3.5 rounded-2xl bg-surface-card hover:bg-surface-elevated border border-border hover:border-brand/60 text-content-secondary hover:text-content-primary font-heading font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>Browse 10 Tech Domains</span>
                    </button>
                  </div>

                  {/* Supporting Tagline */}
                  <div className="pt-2 flex items-center gap-2 text-xs font-mono text-content-muted">
                    <span className="text-cyan-electric">●</span>
                    <span className="tracking-wider uppercase">Discover. Learn. Create. Share.</span>
                  </div>
                </div>

                {/* Right Side: Animated Knowledge Universe */}
                <div className="lg:col-span-6 relative flex items-center justify-center">
                  <KnowledgeUniverse onSelectCategory={handleSelectCategoryFromUniverse} />
                </div>
              </div>
            </section>

            {/* FEATURED VISUAL LESSON */}
            <FeaturedLesson 
              post={featuredPost} 
              onExplore={openPostViewer} 
              onOpenAuthor={() => setCurrentTab('author')} 
            />

            {/* VISUAL DISCOVERY FEED */}
            <div id="discovery-feed">
              <VisualFeed onOpenPost={openPostViewer} onOpenAuthor={() => setCurrentTab('author')} />
            </div>
          </>
        )}

        {currentTab === 'topics' && (
          <div>
            <TechExplorer onSelectCategory={(cat) => setActiveCategory(cat)} />
            <VisualFeed onOpenPost={openPostViewer} onOpenAuthor={() => setCurrentTab('author')} />
          </div>
        )}

        {currentTab === 'community' && (
          <CommunityView onOpenPost={openPostViewer} />
        )}

        {currentTab === 'dashboard' && (
          <PersonalDashboard onOpenPost={openPostViewer} />
        )}

        {currentTab === 'saved' && (
          <SavedSection 
            onOpenPost={openPostViewer} 
            onExploreMore={() => setCurrentTab('explore')} 
          />
        )}

        {currentTab === 'author' && (
          <AuthorProfilePage
            onOpenPost={openPostViewer}
            onExploreFeed={() => setCurrentTab('explore')}
          />
        )}
      </main>

      {/* Global Modals & Interactive Overlays */}
      {/* 1. Immersive Lesson Viewer */}
      {activePostForViewing && (
        <ImmersiveViewer
          post={activePostForViewing}
          initialStepIndex={activePostInitialStep}
          onClose={closePostViewer}
        />
      )}

      {/* 2. Creator Studio */}
      {isCreatorStudioOpen && (
        <CreatorStudio
          onClose={closeCreatorStudio}
          onPublished={(newPost) => openPostViewer(newPost)}
        />
      )}

      {/* 3. Global Search & Command Palette */}
      <SearchModal onOpenPost={openPostViewer} />

      {/* Floating 2FA OTP Transmission Alert */}
      {authorOtpState.dispatchAlert && !isOwnerAuthModalOpen && (
        <div className="fixed top-24 right-4 sm:right-6 z-50 max-w-sm w-full bg-surface-card/95 backdrop-blur-xl border border-cyan-electric/50 rounded-2xl p-4 shadow-[0_0_30px_rgba(32,217,232,0.3)] animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 text-cyan-electric text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-accent-lime animate-ping" />
              <span>Security Key Dispatched</span>
            </div>
            <button
              onClick={clearAuthorOtpAlert}
              className="text-content-muted hover:text-content-primary p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="font-mono text-xs text-content-primary mb-2">
            Target Author ID: <strong className="text-cyan-electric">suman0383solanki@gmail.com</strong>
          </p>
          <div className="p-2.5 rounded-xl bg-surface-elevated border border-border flex items-center justify-between">
            <span className="font-mono font-bold text-accent-lime tracking-widest text-sm">
              {authorOtpState.activeOtp}
            </span>
            <button
              onClick={() => setIsOwnerAuthModalOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-cyan-electric text-surface-card text-xs font-mono font-bold hover:bg-cyan-electric/90"
            >
              Enter Key
            </button>
          </div>
        </div>
      )}

      {/* 4. Author Access Control & Passkey Modal */}
      <OwnerAuthModal />

      {/* 5. User Account Login & Registration Modal */}
      <AuthModal />

      {/* 6. Visitor Feedback & Topic Request Modal */}
      <FeedbackModal />

      {/* Footer */}
      <Footer 
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setCurrentTab('topics');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectTab={(tab) => {
          setCurrentTab(tab as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}

export default App;
