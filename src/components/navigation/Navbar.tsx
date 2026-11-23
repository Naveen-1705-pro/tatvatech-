import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Plus, 
  Menu, 
  X, 
  ShieldCheck, 
  Eye, 
  Bookmark, 
  MessageSquarePlus, 
  ChevronDown,
  Lock,
  LogIn,
  LogOut,
  User as UserIcon,
  Sparkles
} from 'lucide-react';
import { TatvaTechLogo } from '../brand/TatvaTechLogo';
import { AuthorAvatar, TECHIE_AVATAR_DATA_URI, TECHIE_AVATAR_URL } from '../brand/AuthorAvatar';
import { useStore } from '../../lib/store';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const { 
    setIsSearchOpen, 
    openCreatorStudio, 
    userBookmarks, 
    drafts, 
    isOwner, 
    setIsOwnerAuthModalOpen,
    requestAuthorOtp,
    setIsFeedbackModalOpen,
    feedbackList,
    currentUser,
    setIsAuthModalOpen,
    logout
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  // Essential navigation links
  const navLinks = [
    { id: 'explore', label: 'Explore' },
    { id: 'topics', label: 'Topics' },
    { id: 'author', label: 'Author' },
    { id: 'saved', label: 'Saved', count: userBookmarks.length },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1020]/90 backdrop-blur-md border-b border-border shadow-lg py-2.5 sm:py-3'
          : 'bg-transparent border-b border-border/30 py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo & Minimal Nav Links */}
          <div className="flex items-center gap-8">
            <TatvaTechLogo
              size="md"
              showText={true}
              showTagline={false}
              onClick={() => onSelectTab('explore')}
            />

            {/* Desktop Essential Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => onSelectTab(link.id)}
                    className={`relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-cyan-electric bg-surface-card border border-border/70 shadow-sm'
                        : 'text-content-secondary hover:text-content-primary hover:bg-surface-card/40'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.id === 'saved' && link.count !== undefined && link.count > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-cyan-electric/20 text-cyan-electric text-[10px] font-mono font-bold border border-cyan-electric/40">
                        {link.count}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-brand via-cyan-electric to-accent-lime rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right: Only Essential Actions (Search, Feedback, User Profile/Login) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 1. Search Trigger (Clean Icon + Keyboard Shortcut Pill) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-surface-card hover:bg-surface-elevated border border-border hover:border-brand/50 text-content-secondary hover:text-content-primary transition-all flex items-center gap-2 group"
              title="Search topics & algorithms (Ctrl+K)"
            >
              <Search className="w-4 h-4 group-hover:text-cyan-electric transition-colors" />
              <span className="hidden sm:inline font-mono text-[11px] text-content-muted group-hover:text-content-secondary">
                ⌘K
              </span>
            </button>

            {/* 2. Feedback / Topic Request Button */}
            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-surface-card hover:bg-surface-elevated border border-border hover:border-cyan-electric/50 text-cyan-electric text-xs font-mono font-medium transition-all flex items-center gap-1.5"
              title="Leave feedback or request a visual topic"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Feedback</span>
            </button>

            {/* 3. Account Login / User Profile Dropdown */}
            {currentUser ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="p-1 rounded-xl bg-surface-card hover:bg-surface-elevated border border-border hover:border-brand/50 transition-all flex items-center gap-1.5"
                  title={`${currentUser.fullName} (${currentUser.role})`}
                >
                  <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-gradient-to-tr from-brand to-cyan-electric p-0.5">
                    <img
                      src={TECHIE_AVATAR_URL}
                      alt={currentUser.fullName}
                      className="w-full h-full rounded-[6px] object-cover object-center"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = TECHIE_AVATAR_DATA_URI;
                      }}
                    />
                    <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-background ${isOwner ? 'bg-accent-lime' : 'bg-cyan-electric'}`} />
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-content-secondary hidden sm:block pr-0.5" />
                </button>

                {/* Floating Profile & Switcher Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-surface-card/95 backdrop-blur-xl border border-border shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* User Header */}
                    <div className="px-3 py-2.5 border-b border-border/80 mb-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-heading font-bold text-xs text-content-primary truncate max-w-[140px]">
                          {currentUser.fullName}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold uppercase ${
                          isOwner ? 'bg-accent-lime/15 text-accent-lime border border-accent-lime/30' : 'bg-cyan-electric/15 text-cyan-electric border border-cyan-electric/30'
                        }`}>
                          {isOwner ? 'AUTHOR' : 'READER'}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-content-muted block truncate">
                        {currentUser.email}
                      </span>
                    </div>

                    {/* Navigation Items */}
                    <div className="space-y-0.5 text-xs font-mono">
                      <button
                        onClick={() => {
                          onSelectTab('saved');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-left hover:bg-surface-elevated text-content-secondary hover:text-content-primary flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Bookmark className="w-3.5 h-3.5 text-cyan-electric" />
                          <span>My Saved Lessons</span>
                        </div>
                        <span className="text-[10px] text-cyan-electric font-bold font-mono">
                          {userBookmarks.length}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          onSelectTab('author');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-left hover:bg-surface-elevated text-content-secondary hover:text-content-primary flex items-center gap-2 transition-colors"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-accent-lime" />
                        <span>Meet Naveen (Author)</span>
                      </button>

                      {isOwner && (
                        <button
                          onClick={() => {
                            onSelectTab('dashboard');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2 rounded-xl text-left hover:bg-surface-elevated text-content-secondary hover:text-content-primary flex items-center justify-between transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <MessageSquarePlus className="w-3.5 h-3.5 text-accent-lime" />
                            <span>Reader Feedback</span>
                          </div>
                          <span className="text-[10px] text-accent-lime font-bold">
                            {feedbackList.length}
                          </span>
                        </button>
                      )}

                      {/* Switch to Author Mode with 2FA OTP */}
                      {!isOwner && (
                        <button
                          onClick={() => {
                            requestAuthorOtp();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2 rounded-xl text-left bg-brand/10 hover:bg-brand/20 border border-brand/30 text-accent-lime flex items-center justify-between transition-colors my-1"
                        >
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-accent-lime" />
                            <span className="font-semibold text-xs">Switch to Author</span>
                          </div>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-accent-lime/20 text-accent-lime font-bold">
                            OTP
                          </span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setIsFeedbackModalOpen(true);
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-left hover:bg-surface-elevated text-content-secondary hover:text-content-primary flex items-center gap-2 transition-colors"
                      >
                        <MessageSquarePlus className="w-3.5 h-3.5 text-cyan-electric" />
                        <span>Send Feedback</span>
                      </button>

                      <div className="pt-1 my-1 border-t border-border/80 space-y-0.5">
                        <button
                          onClick={() => {
                            setIsAuthModalOpen(true);
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full px-3 py-1.5 rounded-xl text-left hover:bg-surface-elevated text-[11px] text-content-secondary hover:text-content-primary flex items-center gap-2 transition-colors"
                        >
                          <UserIcon className="w-3.5 h-3.5 text-cyan-electric" />
                          <span>Switch Account</span>
                        </button>

                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full px-3 py-1.5 rounded-xl text-left hover:bg-accent-coral/15 text-[11px] text-accent-coral flex items-center gap-2 transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Not Logged In: Sign In CTA */
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-surface-card hover:bg-surface-elevated border border-border hover:border-brand text-xs font-heading font-medium text-content-primary flex items-center gap-1.5 transition-all shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5 text-cyan-electric" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-surface-card border border-border text-content-secondary hover:text-content-primary"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5 bg-surface-card/95 backdrop-blur-xl border-b border-border mt-3 space-y-2">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  onSelectTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand/20 border border-brand/50 text-cyan-electric'
                    : 'text-content-secondary hover:bg-surface-elevated hover:text-content-primary'
                }`}
              >
                <span>{link.label}</span>
                {link.id === 'saved' && link.count !== undefined && link.count > 0 && (
                  <span className="ml-auto px-2 py-0.5 rounded-full bg-cyan-electric/20 text-cyan-electric text-[10px] font-mono font-bold border border-cyan-electric/40">
                    {link.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-border flex flex-col gap-2 text-xs font-mono">
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    onSelectTab('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-3 rounded-lg bg-surface-elevated border border-border text-content-primary text-center"
                >
                  My Dashboard ({userBookmarks.length} saved)
                </button>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-surface-card border border-border text-accent-coral text-center flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out ({currentUser.fullName})</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-brand to-cyan-electric text-content-primary font-bold text-center flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In / Create Account</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsFeedbackModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-surface-card border border-border text-cyan-electric text-center flex items-center justify-center gap-1.5"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Leave Feedback / Request Topic</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
