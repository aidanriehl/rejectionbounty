import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockFeedPosts, getWeeklyScore, type FeedPost } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReelViewer from "@/components/ReelViewer";

function GridThumbnail({
  post,
  rank,
  onClick,
}: {
  post: FeedPost;
  rank?: number;
  onClick: () => void;
}) {
  const rankColors: Record<number, string> = {
    1: "bg-prize text-prize-foreground",
    2: "bg-silver text-foreground",
    3: "bg-bronze text-foreground",
  };

  return (
    <div
      className="relative aspect-[9/16] cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <img
        src={post.thumbnailUrl}
        alt={post.challengeTitle}
        className="h-full w-full object-cover select-none"
        draggable={false}
      />

      {/* Rank badge */}
      {rank && (
        <div
          className={cn(
            "absolute top-1.5 left-1.5 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold",
            rankColors[rank] || "bg-muted text-foreground"
          )}
        >
          {rank}
        </div>
      )}

      {/* Bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Like count */}
      <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1">
        <Heart className="h-3 w-3 fill-white text-white" />
        <span className="text-[10px] font-semibold text-white">{post.likes}</span>
      </div>

      {/* Username */}
      <p className="absolute bottom-1.5 right-1.5 truncate max-w-[60%] text-[10px] text-white/90 font-medium text-right">
        {post.username}
      </p>
    </div>
  );
}

export default function Feed() {
  const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null);

  const weekPosts = [...mockFeedPosts].sort((a, b) => getWeeklyScore(b) - getWeeklyScore(a));
  const allTimePosts = [...mockFeedPosts].sort((a, b) => b.likes - a.likes);
  const friendPosts = mockFeedPosts.filter((p) => p.isFriend).sort((a, b) => a.daysAgo - b.daysAgo);

  return (
    <div className="min-h-screen pb-24 pt-4">
      <div className="mx-auto max-w-lg px-1">
        <h1 className="mb-4 px-3 text-2xl font-bold text-foreground">Feed</h1>

        <Tabs defaultValue="week" className="w-full">
          <TabsList className="mx-3 mb-3 w-[calc(100%-1.5rem)] rounded-lg bg-muted p-1">
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

          <TabsContent value="week">
            <div className="grid grid-cols-3 gap-0.5">
              {weekPosts.map((post) => (
                <GridThumbnail key={post.id} post={post} onClick={() => setSelectedPost(post)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alltime">
            <div className="grid grid-cols-3 gap-0.5">
              {allTimePosts.map((post, i) => (
                <GridThumbnail key={post.id} post={post} rank={i + 1} onClick={() => setSelectedPost(post)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="friends">
            {friendPosts.length > 0 ? (
              <div className="grid grid-cols-3 gap-0.5">
                {friendPosts.map((post) => (
                  <GridThumbnail key={post.id} post={post} onClick={() => setSelectedPost(post)} />
                ))}
              </div>
            ) : (
              <p className="py-12 text-center text-sm text-muted-foreground">
                Add friends to see their videos here
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Full-screen reel viewer */}
      <AnimatePresence>
        {selectedPost && (
          <ReelViewer post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
