import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, ArrowLeft, Grid3X3, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AvatarDisplay from "@/components/AvatarDisplay";
import { avatarLabels } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import type { AvatarType, AvatarStage } from "@/lib/mock-data";

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
      <path d="M12 2L16 12L20 2" stroke={c.ribbon} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="20" r="10" fill={c.fill} stroke={c.stroke} strokeWidth="1.5" />
      <circle cx="16" cy="20" r="6.5" fill="none" stroke={c.stroke} strokeWidth="0.8" opacity="0.5" />
      <path d="M16 15.5L17.5 18.5L20.5 19L18.2 21.2L18.8 24.5L16 23L13.2 24.5L13.8 21.2L11.5 19L14.5 18.5Z" fill={c.stroke} opacity="0.6" />
    </svg>
  );
}

function getMilestone(completed: number) {
  for (let i = MILESTONES.length - 1; i >= 0; i--) {
    if (completed >= MILESTONES[i]) {
      const next = MILESTONES[i + 1];
      if (next) {
        return { current: completed, goal: next, medal: MEDALS[MILESTONES[i]] };
      }
      return { current: completed, goal: MILESTONES[i], medal: MEDALS[MILESTONES[i]] };
    }
  }
  return { current: completed, goal: MILESTONES[0], medal: null };
}

export default function Profile() {
  const { profile, loading } = useAuth();
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const navigate = useNavigate();

  const username = profile?.username || "Username";
  const avatar = (profile?.avatar || "dragon") as AvatarType;
  const avatarStage = (profile?.avatar_stage ?? 0) as AvatarStage;
  const streak = profile?.streak ?? 0;
  const totalCompleted = profile?.total_completed ?? 0;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-4">
      <div className="mx-auto max-w-lg px-4">
        {/* Top bar */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">{username}</h1>
          <button
            onClick={() => navigate("/settings")}
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>

        {/* Avatar */}
        <div className="mb-5 flex flex-col items-center">
          <AvatarDisplay avatar={avatar} stage={avatarStage} size="lg" />
          <p className="mt-1 text-[10px] text-muted-foreground">{avatarLabels[avatarStage]}</p>
        </div>

        {/* Streak Card */}
        <Card className="mb-3">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2">
                <span className="text-2xl leading-none">🔥</span>
                <span className="text-2xl font-bold text-foreground leading-none">{streak}</span>
                <span className="text-lg font-bold text-foreground leading-none">Day Streak</span>
              </p>
              <p className="text-xs text-muted-foreground">Best: {streak} days</p>
            </div>
          </CardContent>
        </Card>

        {/* Challenges Card */}
        {(() => {
          const ms = getMilestone(totalCompleted);
          const progressPct = Math.min((ms.current / ms.goal) * 100, 100);
          return (
            <Card className="mb-5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <p className="flex items-center gap-2">
                    {ms.medal && (
                      <span className="flex items-center"><MedalIcon tier={ms.medal.tier} size={28} /></span>
                    )}
                    <span className="text-2xl font-bold text-foreground leading-none">{totalCompleted}</span>
                    <span className="text-lg font-bold text-foreground leading-none">Challenges Completed</span>
                  </p>
                </div>
                <div className="mt-2">
                  <Progress value={progressPct} className="h-2" />
                  <div className="mt-1 flex items-center justify-between">
                    {totalCompleted > 0 && (
                      <p className="text-[10px] text-muted-foreground">
                        Next milestone: {ms.goal}
                      </p>
                    )}
                    <p className="text-[10px] text-muted-foreground ml-auto">
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

        {/* Empty state for video grid */}
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Camera className="h-10 w-10 text-muted-foreground/50 mb-3" />
          <p className="text-sm text-muted-foreground">
            Complete challenges and post videos to fill your grid
          </p>
        </div>
      </div>
    </div>
  );
}
