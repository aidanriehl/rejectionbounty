export interface Challenge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  completed: boolean;
  hasVideo: boolean;
}

export interface FeedPost {
  id: string;
  username: string;
  avatarUrl: string;
  challengeTitle: string;
  thumbnailUrl: string;
  videoUrl: string;
  likes: number;
  comments: number;
  liked: boolean;
  createdAt: string;
}

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
  { id: "1", username: "brave_sarah", avatarUrl: "", challengeTitle: "Sing in public for 10 seconds", thumbnailUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop", videoUrl: "", likes: 234, comments: 45, liked: true, createdAt: "2h ago" },
  { id: "2", username: "rejection_king", avatarUrl: "", challengeTitle: "Ask for a free coffee", thumbnailUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop", videoUrl: "", likes: 189, comments: 32, liked: false, createdAt: "4h ago" },
  { id: "3", username: "fearless_mike", avatarUrl: "", challengeTitle: "Dance in an elevator", thumbnailUrl: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400&h=300&fit=crop", videoUrl: "", likes: 156, comments: 28, liked: false, createdAt: "6h ago" },
  { id: "4", username: "courage_queen", avatarUrl: "", challengeTitle: "Request a discount at a store", thumbnailUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop", videoUrl: "", likes: 134, comments: 19, liked: true, createdAt: "8h ago" },
  { id: "5", username: "no_fear_nina", avatarUrl: "", challengeTitle: "Ask a stranger for a high-five", thumbnailUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop", videoUrl: "", likes: 98, comments: 15, liked: false, createdAt: "1d ago" },
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
