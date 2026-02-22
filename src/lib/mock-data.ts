export interface Challenge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  completed: boolean;
  hasVideo: boolean;
}

export type AvatarType = "dragon" | "tree" | "fox" | "owl" | "cat";
export type AvatarStage = 0 | 1 | 2 | 3;

export interface UserProfile {
  username: string;
  avatar: AvatarType;
  avatarStage: AvatarStage;
  streak: number;
  totalCompleted: number;
  friends: number;
  isPublic: boolean;
  memberSince: string;
}

export interface FeedPost {
  id: string;
  username: string;
  avatar: AvatarType;
  avatarStage: AvatarStage;
  challengeTitle: string;
  thumbnailUrl: string;
  videoUrl: string;
  likes: number;
  liked: boolean;
  createdAt: string;
  daysAgo: number; // for time-decay scoring
  isFriend: boolean;
}

export const avatarEmojis: Record<AvatarType, string[]> = {
  dragon: ["🪦", "🐉", "🐲", "🐉✨"],
  tree:   ["🪦", "🌱", "🌳", "🌳🍎"],
  fox:    ["🪦", "🦊", "🦊", "🦊👑"],
  owl:    ["🪦", "🦉", "🦉", "🦉✨"],
  cat:    ["🪦", "🐱", "🐈", "🐈👑"],
};

export const avatarLabels: Record<AvatarStage, string> = {
  0: "R.I.P.",
  1: "Rookie",
  2: "Rising",
  3: "Legend",
};

export const mockChallenges: Challenge[] = [
  { id: "1", title: "Ask a stranger for a high-five", description: "Walk up to someone you don't know and ask for a high-five", emoji: "🖐️", completed: false, hasVideo: false },
  { id: "2", title: "Request a discount at a store", description: "Ask for a discount on something that's full price", emoji: "💰", completed: true, hasVideo: true },
  { id: "3", title: "Compliment someone's outfit", description: "Tell a complete stranger you love their outfit", emoji: "👗", completed: true, hasVideo: false },
  { id: "4", title: "Ask to cut in line", description: "Politely ask the person ahead of you if you can go first", emoji: "🚶", completed: false, hasVideo: false },
  { id: "5", title: "Sing in public for 10 seconds", description: "Belt out your favorite song in a public space", emoji: "🎤", completed: true, hasVideo: true },
  { id: "6", title: "Ask for someone's number", description: "Ask a stranger for their phone number", emoji: "📱", completed: false, hasVideo: false },
  { id: "7", title: "Return food at a restaurant", description: "Send back a dish and ask for something different", emoji: "🍽️", completed: false, hasVideo: false },
  { id: "8", title: "Ask to use a stranger's phone", description: "Ask someone if you can borrow their phone for a call", emoji: "☎️", completed: false, hasVideo: false },
  { id: "9", title: "Dance in an elevator", description: "Start dancing when someone else is in the elevator with you", emoji: "🕺", completed: true, hasVideo: true },
  { id: "10", title: "Ask for a free coffee", description: "Walk into a coffee shop and ask if they can give you one for free", emoji: "☕", completed: true, hasVideo: false },
];

export const mockFeedPosts: FeedPost[] = [
  { id: "1", username: "brave_sarah", avatar: "dragon", avatarStage: 3, challengeTitle: "Sing in public for 10 seconds", thumbnailUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop", videoUrl: "", likes: 234, liked: true, createdAt: "2h ago", daysAgo: 0, isFriend: true },
  { id: "2", username: "rejection_king", avatar: "fox", avatarStage: 2, challengeTitle: "Ask for a free coffee", thumbnailUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop", videoUrl: "", likes: 189, liked: false, createdAt: "4h ago", daysAgo: 0, isFriend: false },
  { id: "3", username: "fearless_mike", avatar: "owl", avatarStage: 1, challengeTitle: "Dance in an elevator", thumbnailUrl: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400&h=300&fit=crop", videoUrl: "", likes: 156, liked: false, createdAt: "6h ago", daysAgo: 1, isFriend: true },
  { id: "4", username: "courage_queen", avatar: "cat", avatarStage: 3, challengeTitle: "Request a discount at a store", thumbnailUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop", videoUrl: "", likes: 134, liked: true, createdAt: "1d ago", daysAgo: 2, isFriend: false },
  { id: "5", username: "no_fear_nina", avatar: "tree", avatarStage: 0, challengeTitle: "Ask a stranger for a high-five", thumbnailUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop", videoUrl: "", likes: 98, liked: false, createdAt: "3d ago", daysAgo: 3, isFriend: true },
];

export const mockUserProfile: UserProfile = {
  username: "DailyRejecter",
  avatar: "dragon",
  avatarStage: 2,
  streak: 4,
  totalCompleted: 47,
  friends: 12,
  isPublic: true,
  memberSince: "Jan 2026",
};

export const mockUserVideos = [
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200&h=200&fit=crop",
];

export const getCompletedCount = (challenges: Challenge[]) =>
  challenges.filter((c) => c.completed).length;

export const getTimeUntilSunday = () => {
  const now = new Date();
  const sunday = new Date(now);
  sunday.setDate(now.getDate() + (7 - now.getDay()));
  sunday.setHours(0, 0, 0, 0);
  const diff = sunday.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return { days, hours };
};

// Time-decay scoring for "This Week" feed
export const getWeeklyScore = (post: FeedPost) => {
  const recencyBonus = Math.max(0, 7 - post.daysAgo) * 10;
  return post.likes + recencyBonus;
};
