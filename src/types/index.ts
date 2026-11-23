export interface StepItem {
  id: string;
  stepNumber: number;
  title: string;
  explanation: string;
  imageUrl: string;
  codeSnippet?: string;
  codeLanguage?: string;
  keyTakeaway?: string;
  diagramData?: {
    type: 'network' | 'tree' | 'layer' | 'flow' | 'memory' | 'container';
    nodes?: Array<{ id: string; label: string; x: number; y: number; color?: string }>;
    connections?: Array<{ from: string; to: string; label?: string }>;
  };
}

export interface Creator {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  expertise: string[];
  followersCount: number;
  followingCount: number;
  lessonsCount: number;
  isFollowed?: boolean;
  verified?: boolean;
  github?: string;
  linkedin?: string;
  instagram?: string;
  leetcode?: string;
  location?: string;
}

export interface Comment {
  id: string;
  author: {
    name: string;
    username: string;
    avatarUrl: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage: string;
  category: TechCategory;
  tags: string[];
  creator: Creator;
  stepsCount: number;
  steps: StepItem[];
  likesCount: number;
  bookmarksCount: number;
  viewsCount: number;
  createdAt: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
  readTimeMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isFeatured?: boolean;
  updatedAt?: string;
}

export type TechCategory = 
  | 'Data Structures & Algorithms'
  | 'System Design'
  | 'Docker & DevOps'
  | 'Artificial Intelligence'
  | 'Computer Networks'
  | 'Operating Systems'
  | 'DBMS'
  | 'Web Development'
  | 'Cloud Computing'
  | 'Cybersecurity';

export interface Collection {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  category: TechCategory;
  posts: Post[];
  creator: Creator;
  isPublic: boolean;
  updatedAt: string;
  likesCount: number;
}

export interface DailyConcept {
  id: string;
  title: string;
  teaser: string;
  explanation: string;
  category: TechCategory;
  svgGraphicType: string;
  postId: string;
  date: string;
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  prompt: string;
  category: TechCategory;
  deadline: string;
  participantsCount: number;
  prizeText: string;
}

export type UserRole = 'owner' | 'visitor';

export interface UserAccount {
  id: string;
  email: string;
  fullName: string;
  username: string;
  avatarUrl: string;
  role: UserRole;
  bio?: string;
  expertise?: string[];
  createdAt: string;
}

export interface FeedbackItem {
  id: string;
  name: string;
  email?: string;
  type: 'general' | 'topic_request' | 'clarification' | 'appreciation';
  targetPostTitle?: string;
  message: string;
  rating?: number; // 1 to 5 stars
  createdAt: string;
}

