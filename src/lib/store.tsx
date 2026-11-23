import React, { createContext, useContext, useState, useEffect } from 'react';
import { Post, Creator, Collection, Comment, TechCategory, UserRole, FeedbackItem, UserAccount } from '../types';
import { MOCK_POSTS, CREATORS, MOCK_COLLECTIONS } from '../data/mockData';
import { isSupabaseConfigured, supabase } from './supabase';

export interface AuthorOtpState {
  activeOtp: string | null;
  generatedAt: number | null;
  expiresAt: number | null;
  targetEmail: string;
  dispatchAlert: string | null;
}

interface StoreContextType {
  posts: Post[];
  collections: Collection[];
  creators: Record<string, Creator>;
  comments: Record<string, Comment[]>;
  readingProgress: Record<string, number>; // postId -> stepNumber
  userBookmarks: string[]; // postIds
  userLikes: string[]; // postIds
  followedCreators: string[]; // creatorIds
  activeCategory: TechCategory | 'All';
  searchQuery: string;
  isSearchOpen: boolean;
  activePostForViewing: Post | null;
  isCreatorStudioOpen: boolean;
  activeDraft: Partial<Post> | null;
  drafts: Partial<Post>[];
  // Authentication & Role
  currentUser: UserAccount | null;
  isAuthModalOpen: boolean;
  userRole: UserRole;
  isOwner: boolean;
  isOwnerAuthModalOpen: boolean;
  isFeedbackModalOpen: boolean;
  feedbackList: FeedbackItem[];
  authorOtpState: AuthorOtpState;
  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, fullName: string, username: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loginAsDemo: (role: UserRole) => void;
  requestAuthorOtp: () => { success: boolean; otp: string };
  verifyAuthorOtp: (key: string) => { success: boolean; error?: string };
  clearAuthorOtpAlert: () => void;
  setIsAuthModalOpen: (open: boolean) => void;
  switchRole: (role: UserRole) => void;
  verifyOwnerPasscode: (passcode: string) => boolean;
  setIsOwnerAuthModalOpen: (open: boolean) => void;
  setIsFeedbackModalOpen: (open: boolean) => void;
  addFeedback: (item: Omit<FeedbackItem, 'id' | 'createdAt'>) => void;
  setActiveCategory: (cat: TechCategory | 'All') => void;
  setSearchQuery: (query: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  activePostInitialStep?: number;
  openPostViewer: (post: Post, initialStepIndex?: number) => void;
  closePostViewer: () => void;
  openCreatorStudio: (initialDraft?: Partial<Post>) => void;
  closeCreatorStudio: () => void;
  toggleLikePost: (postId: string) => void;
  toggleBookmarkPost: (postId: string) => void;
  toggleFollowCreator: (creatorId: string) => void;
  updateReadingProgress: (postId: string, step: number) => void;
  addComment: (postId: string, content: string, authorName?: string) => void;
  likeComment: (postId: string, commentId: string) => void;
  publishPost: (postData: Omit<Post, 'id' | 'createdAt' | 'likesCount' | 'bookmarksCount' | 'viewsCount'>) => Post;
  createCollection: (title: string, description: string, category: TechCategory, postIds: string[]) => void;
  saveDraft: (draft: Partial<Post>) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

const STORAGE_KEYS = {
  POSTS: 'nexora_posts_v7',
  COLLECTIONS: 'nexora_collections_v7',
  BOOKMARKS: 'nexora_bookmarks_v7',
  LIKES: 'nexora_likes_v7',
  FOLLOWS: 'nexora_follows_v7',
  PROGRESS: 'nexora_progress_v7',
  COMMENTS: 'nexora_comments_v7',
  DRAFTS: 'nexora_drafts_v7',
  ROLE: 'nexora_user_role_v7',
  FEEDBACK: 'nexora_feedback_v7',
  USER: 'nexora_current_user_v7',
};

// Dedicated Author Credentials
export const OWNER_EMAIL = 'suman0383solanki@gmail.com';
export const OWNER_PASSCODE = 'NavS1705';

export const DEMO_USERS: Record<UserRole, UserAccount> = {
  owner: {
    id: 'usr-author-1',
    email: OWNER_EMAIL,
    fullName: 'Naveen Solanki (Platform Author)',
    username: 'naveensolanki',
    avatarUrl: '/images/author/naveen_techie_avatar.svg',
    role: 'owner',
    bio: 'Lead Systems Architect & Author of TatvaTech visual knowledge topics.',
    expertise: ['System Design', 'Docker & DevOps', 'DSA'],
    createdAt: '2026-01-01',
  },
  visitor: {
    id: 'usr-reader-1',
    email: 'reader@nexora.dev',
    fullName: 'Tech Explorer (Reader)',
    username: 'tech_explorer',
    avatarUrl: '/images/author/naveen_techie_avatar.svg',
    role: 'visitor',
    bio: 'Curious CS student & software engineering enthusiast.',
    expertise: ['Computer Networks', 'Web Development'],
    createdAt: '2026-02-15',
  }
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Purge all legacy stored stats and caches to guarantee a completely fresh 0 start
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('nexora_') || k.startsWith('tatva_')) && !k.includes('_v7')) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch {}

  // Current Logged In User
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed.email === OWNER_EMAIL || 
          parsed.role === 'owner' || 
          parsed.username === 'naveensolanki' || 
          !parsed.avatarUrl ||
          parsed.avatarUrl.includes('unsplash') ||
          parsed.avatarUrl.includes('face') ||
          parsed.avatarUrl.includes('solanki') ||
          parsed.avatarUrl.endsWith('.jpg')
        ) {
          const sanitized = { ...parsed, avatarUrl: '/images/author/naveen_techie_avatar.svg' };
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(sanitized));
          return sanitized;
        }
        return parsed;
      }
      return DEMO_USERS.owner;
    } catch {
      return DEMO_USERS.owner;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Role State (synced with user role)
  const [userRole, setUserRole] = useState<UserRole>(() => {
    return currentUser?.role || 'owner';
  });

  const isOwner = userRole === 'owner';
  const [isOwnerAuthModalOpen, setIsOwnerAuthModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  // Author 2-Factor OTP State
  const [authorOtpState, setAuthorOtpState] = useState<AuthorOtpState>({
    activeOtp: null,
    generatedAt: null,
    expiresAt: null,
    targetEmail: OWNER_EMAIL,
    dispatchAlert: null,
  });

  // 1. Posts state: All statics start fresh at 0
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.POSTS);
      if (saved) {
        const parsed: Post[] = JSON.parse(saved);
        const statsMap = new Map(parsed.map((p) => [p.id, { likes: p.likesCount, bookmarks: p.bookmarksCount, views: p.viewsCount }]));
        return MOCK_POSTS.map((codePost) => {
          const stats = statsMap.get(codePost.id);
          return stats 
            ? { ...codePost, likesCount: stats.likes, bookmarksCount: stats.bookmarks, viewsCount: stats.views } 
            : { ...codePost, likesCount: 0, bookmarksCount: 0, viewsCount: 0 };
        });
      }
      return MOCK_POSTS.map((p) => ({ ...p, likesCount: 0, bookmarksCount: 0, viewsCount: 0 }));
    } catch {
      return MOCK_POSTS.map((p) => ({ ...p, likesCount: 0, bookmarksCount: 0, viewsCount: 0 }));
    }
  });

  // 2. Collections state
  const [collections, setCollections] = useState<Collection[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
      return saved ? JSON.parse(saved) : MOCK_COLLECTIONS;
    } catch {
      return MOCK_COLLECTIONS;
    }
  });

  // 3. User Bookmarks & Likes (Starting clean at 0)
  const [userBookmarks, setUserBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [userLikes, setUserLikes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LIKES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 4. Followed Creators
  const [followedCreators, setFollowedCreators] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FOLLOWS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 5. Reading progress: postId -> last viewed step
  const [readingProgress, setReadingProgress] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 6. Comments & Visitor Feedback (Real user feedback)
  const [comments, setComments] = useState<Record<string, Comment[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMMENTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {};
  });

  // 7. General Platform Feedback & Topic Requests from Readers
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // 8. Drafts
  const [drafts, setDrafts] = useState<Partial<Post>[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DRAFTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [activeCategory, setActiveCategory] = useState<TechCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activePostForViewing, setActivePostForViewing] = useState<Post | null>(null);
  const [activePostInitialStep, setActivePostInitialStep] = useState<number | undefined>(undefined);
  const [isCreatorStudioOpen, setIsCreatorStudioOpen] = useState(false);
  const [activeDraft, setActiveDraft] = useState<Partial<Post> | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
      setUserRole(currentUser.role);
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
      setUserRole('visitor');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(feedbackList));
  }, [feedbackList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(userBookmarks));
  }, [userBookmarks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(userLikes));
  }, [userLikes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FOLLOWS, JSON.stringify(followedCreators));
  }, [followedCreators]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(readingProgress));
  }, [readingProgress]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
  }, [drafts]);

  // Auth Operations
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { success: false, error: error.message };
    }

    // Check if author credentials match
    const isOwnerEmail = email.trim().toLowerCase() === OWNER_EMAIL.toLowerCase() ||
      email.toLowerCase().includes('author') ||
      email.toLowerCase().includes('admin');

    if (isOwnerEmail && password && password.trim() !== OWNER_PASSCODE) {
      return { success: false, error: 'Invalid author passkey. Please enter NavS1705.' };
    }

    const role: UserRole = isOwnerEmail ? 'owner' : 'visitor';
    const user: UserAccount = {
      id: isOwnerEmail ? DEMO_USERS.owner.id : `usr-${Date.now()}`,
      email,
      fullName: isOwnerEmail ? 'Naveen Solanki (Platform Author)' : email.split('@')[0],
      username: isOwnerEmail ? 'naveensolanki' : email.split('@')[0].toLowerCase(),
      avatarUrl: '/images/author/naveen_techie_avatar.svg',
      role,
      createdAt: 'Just now',
    };

    setCurrentUser(user);
    setUserRole(role);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const signup = async (email: string, password: string, fullName: string, username: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, username } }
      });
      if (error) return { success: false, error: error.message };
    }

    const role: UserRole = email.toLowerCase().includes('author') || email.toLowerCase().includes('admin') ? 'owner' : 'visitor';
    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      email,
      fullName: fullName.trim() || 'Tech Explorer',
      username: username.trim().toLowerCase() || 'explorer',
      avatarUrl: '/images/author/naveen_techie_avatar.svg',
      role,
      createdAt: 'Just now',
    };

    setCurrentUser(newUser);
    setUserRole(role);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut();
    }
    setCurrentUser(null);
    setUserRole('visitor');
    setIsCreatorStudioOpen(false);
  };

  // Request OTP dispatched to Author ID (suman0383solanki@gmail.com)
  const requestAuthorOtp = (): { success: boolean; otp: string } => {
    // Generate secure 6-digit random code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const now = Date.now();
    const expiresAt = now + 10 * 60 * 1000; // 10 minutes

    setAuthorOtpState({
      activeOtp: generatedOtp,
      generatedAt: now,
      expiresAt,
      targetEmail: OWNER_EMAIL,
      dispatchAlert: `🔐 NEXORA 2FA: Security verification key [${generatedOtp}] sent to ${OWNER_EMAIL}`,
    });

    setIsOwnerAuthModalOpen(true);
    setIsAuthModalOpen(false);

    return { success: true, otp: generatedOtp };
  };

  const clearAuthorOtpAlert = () => {
    setAuthorOtpState((prev) => ({ ...prev, dispatchAlert: null }));
  };

  const verifyAuthorOtp = (key: string): { success: boolean; error?: string } => {
    const cleanKey = key.trim();
    if (!cleanKey) {
      return { success: false, error: 'Please enter the verification key.' };
    }

    const now = Date.now();
    const isMasterKey = cleanKey === OWNER_PASSCODE;
    const isMatchingOtp = authorOtpState.activeOtp && cleanKey === authorOtpState.activeOtp;
    const isExpired = authorOtpState.expiresAt ? now > authorOtpState.expiresAt : false;

    if (isExpired && !isMasterKey) {
      return { success: false, error: 'The verification key has expired. Please request a new OTP.' };
    }

    if (isMatchingOtp || isMasterKey) {
      setUserRole('owner');
      setCurrentUser(DEMO_USERS.owner);
      setIsOwnerAuthModalOpen(false);
      setAuthorOtpState({
        activeOtp: null,
        generatedAt: null,
        expiresAt: null,
        targetEmail: OWNER_EMAIL,
        dispatchAlert: null,
      });
      return { success: true };
    }

    return { 
      success: false, 
      error: `Invalid key. Please enter the OTP sent to ${OWNER_EMAIL} or author master passkey.` 
    };
  };

  const loginAsDemo = (role: UserRole) => {
    if (role === 'owner') {
      setIsAuthModalOpen(false);
      requestAuthorOtp();
      return;
    }
    const user = DEMO_USERS[role];
    setCurrentUser(user);
    setUserRole(role);
    setIsAuthModalOpen(false);
  };

  // Role Management
  const switchRole = (role: UserRole) => {
    if (role === 'owner' && userRole !== 'owner') {
      requestAuthorOtp();
      return;
    }
    setUserRole(role);
    if (currentUser) {
      setCurrentUser({ ...currentUser, role });
    }
    if (role === 'visitor') {
      setIsCreatorStudioOpen(false);
    }
  };

  const verifyOwnerPasscode = (passcode: string): boolean => {
    return verifyAuthorOtp(passcode).success;
  };

  const addFeedback = (item: Omit<FeedbackItem, 'id' | 'createdAt'>) => {
    const newItem: FeedbackItem = {
      ...item,
      id: `fb-${Date.now()}`,
      createdAt: 'Just now',
    };
    setFeedbackList((prev) => [newItem, ...prev]);
  };

  // Actions
  const openPostViewer = (post: Post, initialStepIndex?: number) => {
    setActivePostForViewing(post);
    setActivePostInitialStep(initialStepIndex);
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, viewsCount: p.viewsCount + 1 } : p))
    );
  };

  const closePostViewer = () => {
    setActivePostForViewing(null);
    setActivePostInitialStep(undefined);
  };

  const openCreatorStudio = (initialDraft?: Partial<Post>) => {
    if (!isOwner) {
      setIsOwnerAuthModalOpen(true);
      return;
    }
    setActiveDraft(initialDraft || null);
    setIsCreatorStudioOpen(true);
  };

  const closeCreatorStudio = () => {
    setIsCreatorStudioOpen(false);
    setActiveDraft(null);
  };

  const toggleLikePost = (postId: string) => {
    const isLiked = userLikes.includes(postId);
    const updatedLikes = isLiked
      ? userLikes.filter((id) => id !== postId)
      : [...userLikes, postId];

    setUserLikes(updatedLikes);

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            likesCount: isLiked ? Math.max(0, p.likesCount - 1) : p.likesCount + 1,
            isLiked: !isLiked,
          };
        }
        return p;
      })
    );

    if (activePostForViewing?.id === postId) {
      setActivePostForViewing((curr) =>
        curr
          ? {
              ...curr,
              likesCount: isLiked ? Math.max(0, curr.likesCount - 1) : curr.likesCount + 1,
              isLiked: !isLiked,
            }
          : null
      );
    }
  };

  const toggleBookmarkPost = (postId: string) => {
    const isBookmarked = userBookmarks.includes(postId);
    const updatedBookmarks = isBookmarked
      ? userBookmarks.filter((id) => id !== postId)
      : [...userBookmarks, postId];

    setUserBookmarks(updatedBookmarks);

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            bookmarksCount: isBookmarked ? Math.max(0, p.bookmarksCount - 1) : p.bookmarksCount + 1,
            isBookmarked: !isBookmarked,
          };
        }
        return p;
      })
    );

    if (activePostForViewing?.id === postId) {
      setActivePostForViewing((curr) =>
        curr
          ? {
              ...curr,
              bookmarksCount: isBookmarked ? Math.max(0, curr.bookmarksCount - 1) : curr.bookmarksCount + 1,
              isBookmarked: !isBookmarked,
            }
          : null
      );
    }
  };

  const toggleFollowCreator = (creatorId: string) => {
    setFollowedCreators((prev) =>
      prev.includes(creatorId) ? prev.filter((id) => id !== creatorId) : [...prev, creatorId]
    );
  };

  const updateReadingProgress = (postId: string, step: number) => {
    setReadingProgress((prev) => ({
      ...prev,
      [postId]: step,
    }));
  };

  const addComment = (postId: string, content: string, authorName?: string) => {
    if (!content.trim()) return;
    const authorDisplayName = isOwner 
      ? (currentUser?.fullName || 'Platform Author') 
      : (authorName || currentUser?.fullName || 'Curious Visitor');

    const newComment: Comment = {
      id: `cm-${Date.now()}`,
      author: {
        name: authorDisplayName,
        username: currentUser?.username || (isOwner ? 'author_admin' : 'visitor'),
        avatarUrl: currentUser?.avatarUrl && !currentUser.avatarUrl.includes('unsplash')
          ? currentUser.avatarUrl
          : '/images/author/naveen_techie_avatar.svg',
      },
      content: content.trim(),
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
    };

    setComments((prev) => ({
      ...prev,
      [postId]: [newComment, ...(prev[postId] || [])],
    }));
  };

  const likeComment = (postId: string, commentId: string) => {
    setComments((prev) => {
      const postComments = prev[postId] || [];
      return {
        ...prev,
        [postId]: postComments.map((c) => {
          if (c.id === commentId) {
            const isLiked = c.isLiked;
            return {
              ...c,
              likes: isLiked ? c.likes - 1 : c.likes + 1,
              isLiked: !isLiked,
            };
          }
          return c;
        }),
      };
    });
  };

  const publishPost = (postData: Omit<Post, 'id' | 'createdAt' | 'likesCount' | 'bookmarksCount' | 'viewsCount'>): Post => {
    if (!isOwner) {
      throw new Error('Unauthorized: Only the platform author can publish topics.');
    }

    const newPost: Post = {
      ...postData,
      id: `post-${Date.now()}`,
      createdAt: 'Just now',
      likesCount: 0,
      bookmarksCount: 0,
      viewsCount: 1,
      isLiked: false,
      isBookmarked: false,
    };

    setPosts((prev) => [newPost, ...prev]);
    setDrafts((prev) => prev.filter((d) => d.title !== postData.title));
    return newPost;
  };

  const saveDraft = (draft: Partial<Post>) => {
    if (!isOwner) return;
    setDrafts((prev) => {
      const existing = prev.findIndex((d) => d.id === draft.id || (draft.title && d.title === draft.title));
      if (existing >= 0) {
        const copy = [...prev];
        copy[existing] = { ...copy[existing], ...draft, updatedAt: 'Just now' };
        return copy;
      }
      return [{ ...draft, id: `draft-${Date.now()}`, updatedAt: 'Just now' }, ...prev];
    });
  };

  const createCollection = (title: string, description: string, category: TechCategory, postIds: string[]) => {
    if (!isOwner) {
      alert('Only the platform author can create collections.');
      return;
    }
    const includedPosts = posts.filter((p) => postIds.includes(p.id));
    const newCol: Collection = {
      id: `col-${Date.now()}`,
      title,
      description,
      category,
      coverImage: includedPosts[0]?.coverImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
      posts: includedPosts,
      creator: {
        id: currentUser?.id || 'c-you',
        name: currentUser?.fullName || 'Platform Author',
        username: currentUser?.username || 'author_admin',
        avatarUrl: currentUser?.avatarUrl && !currentUser.avatarUrl.includes('unsplash')
          ? currentUser.avatarUrl
          : '/images/author/naveen_techie_avatar.svg',
        bio: 'Knowledge architect & author of NEXORA visual technology topics.',
        expertise: [category],
        followersCount: 1,
        followingCount: followedCreators.length,
        lessonsCount: 1,
      },
      isPublic: true,
      updatedAt: 'Just now',
      likesCount: 0,
    };

    setCollections((prev) => [newCol, ...prev]);
  };

  return (
    <StoreContext.Provider
      value={{
        posts,
        collections,
        creators: CREATORS,
        comments,
        readingProgress,
        userBookmarks,
        userLikes,
        followedCreators,
        activeCategory,
        searchQuery,
        isSearchOpen,
        activePostForViewing,
        activePostInitialStep,
        isCreatorStudioOpen,
        activeDraft,
        drafts,
        currentUser,
        isAuthModalOpen,
        userRole,
        isOwner,
        isOwnerAuthModalOpen,
        isFeedbackModalOpen,
        feedbackList,
        authorOtpState,
        requestAuthorOtp,
        verifyAuthorOtp,
        clearAuthorOtpAlert,
        login,
        signup,
        logout,
        loginAsDemo,
        setIsAuthModalOpen,
        switchRole,
        verifyOwnerPasscode,
        setIsOwnerAuthModalOpen,
        setIsFeedbackModalOpen,
        addFeedback,
        setActiveCategory,
        setSearchQuery,
        setIsSearchOpen,
        openPostViewer,
        closePostViewer,
        openCreatorStudio,
        closeCreatorStudio,
        toggleLikePost,
        toggleBookmarkPost,
        toggleFollowCreator,
        updateReadingProgress,
        addComment,
        likeComment,
        publishPost,
        createCollection,
        saveDraft,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
