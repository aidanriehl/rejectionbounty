import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockFeedPosts, type FeedPost } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function PostCard({ post }: { post: FeedPost }) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-2xl border bg-card"
    >
      {/* Video thumbnail */}
      <div className="relative aspect-[4/3] bg-muted">
        <img
          src={post.thumbnailUrl}
          alt={post.challengeTitle}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/90 shadow-lg">
            <Play className="h-6 w-6 fill-primary text-primary" />
          </div>
        </div>
        <div className="absolute bottom-2 left-2 rounded-full bg-foreground/70 px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
          0:30
        </div>
      </div>

      {/* Post info */}
      <div className="p-3">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-primary-foreground">
            {post.username[0].toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-foreground">{post.username}</p>
            <p className="truncate text-xs text-muted-foreground">{post.challengeTitle}</p>
          </div>
          <span className="text-xs text-muted-foreground">{post.createdAt}</span>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleLike} className="flex items-center gap-1.5 transition-transform active:scale-90">
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                liked ? "fill-destructive text-destructive" : "text-muted-foreground"
              )}
            />
            <span className="text-sm font-semibold text-foreground">{likeCount}</span>
          </button>
          <button className="flex items-center gap-1.5">
            <MessageCircle className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">{post.comments}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Feed() {
  return (
    <div className="min-h-screen pb-24 pt-4">
      <div className="mx-auto max-w-lg px-4">
        <h1 className="mb-4 text-3xl font-bold text-foreground">Feed 📺</h1>

        <Tabs defaultValue="week" className="w-full">
          <TabsList className="mb-4 w-full rounded-2xl bg-muted p-1">
            <TabsTrigger value="week" className="flex-1 rounded-xl font-semibold">
              This Week
            </TabsTrigger>
            <TabsTrigger value="alltime" className="flex-1 rounded-xl font-semibold">
              All Time 🏆
            </TabsTrigger>
          </TabsList>

          <TabsContent value="week" className="space-y-4">
            {mockFeedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="alltime" className="space-y-4">
            {[...mockFeedPosts].reverse().map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
