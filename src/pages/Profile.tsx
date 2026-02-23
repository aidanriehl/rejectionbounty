import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, ArrowLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AvatarDisplay from "@/components/AvatarDisplay";
import { mockUserProfile, mockUserVideos, avatarLabels } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Profile() {
  const [profile] = useState(mockUserProfile);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 pt-4">
      <div className="mx-auto max-w-lg px-4">
        {/* Top bar — username + settings */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">{profile.username}</h1>
          <button
            onClick={() => navigate("/settings")}
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>

        {/* Avatar — centered */}
        <div className="mb-5 flex flex-col items-center">
          <AvatarDisplay avatar={profile.avatar} stage={profile.avatarStage} size="lg" />
          <p className="mt-1 text-[10px] text-muted-foreground">{avatarLabels[profile.avatarStage]}</p>
        </div>

        {/* Streak Card */}
        <Card className="mb-3">
          <CardContent className="p-4">
            <div className="mb-2 flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-bold text-foreground">{profile.streak} 🔥 </span>
                <span className="text-xs text-muted-foreground">Day Streak</span>
              </div>
              <p className="text-xs text-muted-foreground">Best: {profile.bestStreak} days</p>
            </div>
            <Progress value={(profile.streak / 7) * 100} className="h-2" />
            <p className="mt-1 text-[10px] text-muted-foreground text-right">{profile.streak}/7 this week</p>
          </CardContent>
        </Card>

        {/* Challenges Card */}
        <Card className="mb-5">
          <CardContent className="p-4">
            <span className="text-2xl font-bold text-foreground">{profile.totalCompleted} </span>
            <span className="text-xs text-muted-foreground">Challenges Completed</span>
            <p className="mt-1 text-xs text-muted-foreground">
              {Math.round((profile.totalCompleted / profile.totalAttempted) * 100)}% completion rate
            </p>
          </CardContent>
        </Card>

        {/* Video Grid (3x3, edge-to-edge like IG) */}
        <div className="grid grid-cols-3 gap-0.5">
          {mockUserVideos.map((url, i) => (
            <button
              key={i}
              className="aspect-square bg-muted overflow-hidden"
              onClick={() => setSelectedVideo(i)}
            >
              <img src={url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen video viewer */}
      <AnimatePresence>
        {selectedVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 left-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <img
              src={mockUserVideos[selectedVideo]}
              alt=""
              className="h-full w-full object-cover select-none"
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
