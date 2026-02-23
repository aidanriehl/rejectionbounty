import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockFeedPosts, getWeeklyScore, type FeedPost } from "@/lib/mock-data";
import AvatarDisplay from "@/components/AvatarDisplay";

const TABS = [
  { key: "week", label: "This Week" },
  { key: "friends", label: "Friends" },
  { key: "alltime", label: "All Time" },
] as const;

function ReelCard({ post }: { post: FeedPost }) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const lastTapRef = useRef(0);

  const doLike = useCallback(() => {
    if (!liked) {
      setLiked(true);
      setLikeCount((c) => c + 1);
    }
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 600);
  }, [liked]);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  const handleDoubleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      doLike();
    }
    lastTapRef.current = now;
  }, [doLike]);

  return (
    <div
      className="relative h-[calc(100vh-5rem)] w-full snap-start snap-always flex-shrink-0"
      onClick={handleDoubleTap}
    >
      <img
        src={post.thumbnailUrl}
        alt={post.challengeTitle}
        className="h-full w-full object-cover select-none"
        draggable={false}
      />

      <AnimatePresence>
        {showHeartAnim && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Heart className="h-24 w-24 fill-white text-white drop-shadow-lg" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute right-3 bottom-16 flex flex-col items-center gap-1">
        <button
          onClick={(e) => { e.stopPropagation(); toggleLike(); }}
          className="flex flex-col items-center gap-1 transition-transform active:scale-90"
        >
          <Heart
            className={cn(
              "h-7 w-7 transition-colors drop-shadow-md",
              liked ? "fill-destructive text-destructive" : "text-white"
            )}
          />
          <span className="text-xs font-semibold text-white drop-shadow-md">{likeCount}</span>
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      <div className="absolute bottom-4 left-4 right-16">
        <div className="flex items-center gap-2.5 mb-1.5">
          <AvatarDisplay
            avatar={post.avatar}
            stage={post.avatarStage}
            size="sm"
            showAddFriend={!post.isFriend}
            onAddFriend={() => {}}
          />
          <span className="text-sm font-semibold text-white drop-shadow-md">{post.username}</span>
        </div>
        <p className="text-xs text-white/80 drop-shadow-md">{post.challengeTitle}</p>
      </div>
    </div>
  );
}

function FeedPane({ posts }: { posts: FeedPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-white/60">Add friends to see their videos here</p>
      </div>
    );
  }
  return (
    <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      {posts.map((post) => (
        <ReelCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default function Feed() {
  const [tabIndex, setTabIndex] = useState(0);
  const dragX = useMotionValue(0);

  const weekPosts = [...mockFeedPosts].sort((a, b) => getWeeklyScore(b) - getWeeklyScore(a));
  const allTimePosts = [...mockFeedPosts].sort((a, b) => b.likes - a.likes);
  const friendPosts = mockFeedPosts.filter((p) => p.isFriend).sort((a, b) => a.daysAgo - b.daysAgo);

  const panes = [weekPosts, friendPosts, allTimePosts];

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold && tabIndex < TABS.length - 1) {
      setTabIndex(tabIndex + 1);
    } else if (info.offset.x > threshold && tabIndex > 0) {
      setTabIndex(tabIndex - 1);
    }
  };

  // Indicator position: fraction across the tab bar
  const indicatorX = useTransform(
    dragX,
    [200, 0, -200],
    [
      `${Math.max(0, tabIndex - 1) * (100 / TABS.length)}%`,
      `${tabIndex * (100 / TABS.length)}%`,
      `${Math.min(TABS.length - 1, tabIndex + 1) * (100 / TABS.length)}%`,
    ]
  );

  return (
    <div className="relative h-[calc(100vh-5rem)] w-full overflow-hidden bg-black">
      {/* Tab bar overlay */}
      <div className="absolute top-0 inset-x-0 z-10 pt-3 px-4">
        <div className="relative bg-black/30 backdrop-blur-sm rounded-lg p-1">
          {/* Active indicator */}
          <motion.div
            className="absolute top-1 bottom-1 rounded-md bg-white/20"
            style={{ width: `${100 / TABS.length}%` }}
            animate={{ left: `${tabIndex * (100 / TABS.length)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <div className="relative flex">
            {TABS.map((tab, i) => (
              <button
                key={tab.key}
                onClick={() => setTabIndex(i)}
                className={cn(
                  "flex-1 py-1.5 text-sm font-medium rounded-md transition-colors z-10",
                  i === tabIndex ? "text-white" : "text-white/50"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Swipeable panes */}
      <motion.div
        className="flex h-full"
        style={{ x: dragX }}
        animate={{ x: -tabIndex * 100 + "%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
      >
        {panes.map((posts, i) => (
          <div key={TABS[i].key} className="h-full w-full flex-shrink-0">
            <FeedPane posts={posts} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
