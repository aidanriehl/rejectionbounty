import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, ArrowLeft, Grid3X3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AvatarDisplay from "@/components/AvatarDisplay";
import { mockUserProfile, mockUserVideos, avatarLabels } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const MILESTONES = [10, 50, 100, 150, 200] as const;

type MedalTier = "bronze" | "silver" | "gold" | "diamond" | "champion";

const MEDAL_COLORS: Record<MedalTier, { fill: string; stroke: string; ribbon: string }> = {
  bronze:   { fill: "#CD7F32", stroke: "#A0522D", ribbon: "#8B4513" },
  silver:   { fill: "#C0C0C0", stroke: "#A8A8A8", ribbon: "#808080" },
  gold:     { fill: "#FFD700", stroke: "#DAA520", ribbon: "#B8860B" },
  diamond:  { fill: "#B9F2FF", stroke: "#7EC8E3", ribbon: "#4A90D9" },
  champion: { fill: "#E8D44D", stroke: "#DAA520", ribbon: "#8B0000" },
};

const MEDALS: Record<number, { tier: MedalTier; label: string }> = {
  10:  { tier: "bronze", label: "Bronze" },
  50:  { tier: "silver", label: "Silver" },
  100: { tier: "gold", label: "Gold" },
  150: { tier: "diamond", label: "Diamond" },
  200: { tier: "champion", label: "Champion" },
};

function MedalIcon({ tier, size = 28 }: { tier: MedalTier; size?: number }) {
  const c = MEDAL_COLORS[tier];
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ribbon */}
      <path d="M12 2L16 12L20 2" stroke={c.ribbon} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Circle */}
      <circle cx="16" cy="20" r="10" fill={c.fill} stroke={c.stroke} strokeWidth="1.5" />
      {/* Inner circle */}
      <circle cx="16" cy="20" r="6.5" fill="none" stroke={c.stroke} strokeWidth="0.8" opacity="0.5" />
      {/* Star */}
      <path d="M16 15.5L17.5 18.5L20.5 19L18.2 21.2L18.8 24.5L16 23L13.2 24.5L13.8 21.2L11.5 19L14.5 18.5Z" fill={c.stroke} opacity="0.6" />
    </svg>
  );
}

function getMilestone(completed: number) {
  // Find current milestone bracket
  for (let i = MILESTONES.length - 1; i >= 0; i--) {
    if (completed >= MILESTONES[i]) {
      const next = MILESTONES[i + 1];
      if (next) {
        return { current: completed, goal: next, medal: MEDALS[MILESTONES[i]] };
      }
      // Maxed out
      return { current: completed, goal: MILESTONES[i], medal: MEDALS[MILESTONES[i]] };
    }
  }
  // Below first milestone
  return { current: completed, goal: MILESTONES[0], medal: null };
}

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
            <div className="flex items-center justify-between">
              <p className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">🔥 {profile.streak}</span>
                <span className="text-lg font-bold text-foreground">Day Streak</span>
              </p>
              <p className="text-xs text-muted-foreground">Best: {profile.bestStreak} days</p>
            </div>
          </CardContent>
        </Card>

        {/* Challenges Card */}
        {(() => {
          const ms = getMilestone(profile.totalCompleted);
          const progressPct = Math.min((ms.current / ms.goal) * 100, 100);
          return (
            <Card className="mb-5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">{profile.totalCompleted}</span>
                    <span className="text-lg font-bold text-foreground">Challenges Completed</span>
                  </p>
                  {ms.medal && (
                    <MedalIcon tier={ms.medal.tier} />
                  )}
                </div>
                <div className="mt-2">
                  <Progress value={progressPct} className="h-2" />
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-[10px] text-muted-foreground">
                      {Math.round((profile.totalCompleted / profile.totalAttempted) * 100)}% weekly completion rate
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {ms.current}/{ms.goal}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })()}

        {/* Grid icon + divider */}
        <div className="mb-0.5 flex justify-center border-b border-border pb-2">
          <Grid3X3 className="h-5 w-5 text-foreground" />
        </div>

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
              className="absolute top-4 left-4 z-10 text-white"
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
