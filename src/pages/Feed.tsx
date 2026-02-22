import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockFeedPosts, getWeeklyScore, type FeedPost } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AvatarDisplay from "@/components/AvatarDisplay";

function PostCard({ post, rank }: { post: FeedPost; rank?: number }) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const lastTapRef = useRef(0);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  const doLike = useCallback(() => {
    if (!liked) {
      setLiked(true);
      setLikeCount((c) => c + 1);
    }
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 600);
  }, [liked]);

  const handleDoubleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      doLike();
    }
    lastTapRef.current = now;
  }, [doLike]);

  const rankColors: Record<number, string> = {
    1: "bg-prize text-prize-foreground",
    2: "bg-silver text-foreground",
    3: "bg-bronze text-foreground",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-xl border bg-card"
      onClick={handleDoubleTap}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[9/16] bg-muted">
        <img
          src={post.thumbnailUrl}
          alt={post.challengeTitle}
          className="h-full w-full object-cover select-none"
          draggable={false}
        />
        {rank && (
          <div className={cn(
            "absolute top-2 left-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
            rankColors[rank] || "bg-muted text-foreground"
          )}>
            {rank}
          </div>
        )}
        {/* Double-tap heart animation */}
        <AnimatePresence>
          {showHeartAnim && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <Heart className="h-16 w-16 fill-white text-white drop-shadow-lg" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Post info */}
      <div className="p-3">
        <div className="mb-2 flex items-center gap-2">
          <AvatarDisplay
            avatar={post.avatar}
            stage={post.avatarStage}
            size="sm"
            showAddFriend={!post.isFriend}
            onAddFriend={() => {}}
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">{post.username}</p>
            <p className="truncate text-xs text-muted-foreground">{post.challengeTitle}</p>
          </div>
          <span className="text-xs text-muted-foreground">{post.createdAt}</span>
        </div>

        <div className="flex justify-end">
          <button onClick={(e) => { e.stopPropagation(); toggleLike(); }} className="flex items-center gap-1.5 transition-transform active:scale-90">
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                liked ? "fill-destructive text-destructive" : "text-muted-foreground"
              )}
            />
            <span className="text-sm font-semibold text-foreground">{likeCount}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Feed() {
  // Sort: This Week = time-decay score, All Time = pure likes, Friends = chronological
  const weekPosts = [...mockFeedPosts].sort((a, b) => getWeeklyScore(b) - getWeeklyScore(a));
  const allTimePosts = [...mockFeedPosts].sort((a, b) => b.likes - a.likes);
  const friendPosts = mockFeedPosts.filter((p) => p.isFriend).sort((a, b) => a.daysAgo - b.daysAgo);

  return (
    <div className="min-h-screen pb-24 pt-4">
      <div className="mx-auto max-w-lg px-4">
        <h1 className="mb-4 text-2xl font-bold text-foreground">Feed</h1>

        <Tabs defaultValue="week" className="w-full">
          <TabsList className="mb-4 w-full rounded-lg bg-muted p-1">
            <TabsTrigger value="week" className="flex-1 rounded-md text-sm font-medium">
              This Week
            </TabsTrigger>
            <TabsTrigger value="alltime" className="flex-1 rounded-md text-sm font-medium">
              All Time
            </TabsTrigger>
            <TabsTrigger value="friends" className="flex-1 rounded-md text-sm font-medium">
              Friends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="week" className="space-y-3">
            {weekPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="alltime" className="space-y-3">
            {allTimePosts.map((post, i) => (
              <PostCard key={post.id} post={post} rank={i + 1} />
            ))}
          </TabsContent>

          <TabsContent value="friends" className="space-y-3">
            {friendPosts.length > 0 ? (
              friendPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <p className="py-12 text-center text-sm text-muted-foreground">
                Add friends to see their videos here
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
