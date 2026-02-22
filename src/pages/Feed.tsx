import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockFeedPosts, getWeeklyScore, type FeedPost } from "@/lib/mock-data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AvatarDisplay from "@/components/AvatarDisplay";

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
      {/* Full-bleed image */}
      <img
        src={post.thumbnailUrl}
        alt={post.challengeTitle}
        className="h-full w-full object-cover select-none"
        draggable={false}
      />

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
            <Heart className="h-24 w-24 fill-white text-white drop-shadow-lg" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right action bar */}
      <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5">
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

      {/* Bottom info */}
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

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </div>
  );
}

export default function Feed() {
  const [activeTab, setActiveTab] = useState("week");

  const weekPosts = [...mockFeedPosts].sort((a, b) => getWeeklyScore(b) - getWeeklyScore(a));
  const allTimePosts = [...mockFeedPosts].sort((a, b) => b.likes - a.likes);
  const friendPosts = mockFeedPosts.filter((p) => p.isFriend).sort((a, b) => a.daysAgo - b.daysAgo);

  const currentPosts =
    activeTab === "week" ? weekPosts :
    activeTab === "alltime" ? allTimePosts :
    friendPosts;

  return (
    <div className="relative h-[calc(100vh-5rem)] w-full overflow-hidden bg-black">
      {/* Tabs overlay at top */}
      <div className="absolute top-0 inset-x-0 z-10 pt-3 px-4">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full bg-transparent">
              <TabsTrigger
                value="week"
                className="flex-1 rounded-md text-sm font-medium text-white/60 data-[state=active]:bg-white/20 data-[state=active]:text-white"
              >
                This Week
              </TabsTrigger>
              <TabsTrigger
                value="alltime"
                className="flex-1 rounded-md text-sm font-medium text-white/60 data-[state=active]:bg-white/20 data-[state=active]:text-white"
              >
                All Time
              </TabsTrigger>
              <TabsTrigger
                value="friends"
                className="flex-1 rounded-md text-sm font-medium text-white/60 data-[state=active]:bg-white/20 data-[state=active]:text-white"
              >
                Friends
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Vertical snap-scroll feed */}
      <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <ReelCard key={post.id} post={post} />
          ))
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-white/60">Add friends to see their videos here</p>
          </div>
        )}
      </div>
    </div>
  );
}
