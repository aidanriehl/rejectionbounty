import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import AvatarDisplay from "@/components/AvatarDisplay";
import { mockUserProfile, mockUserVideos, avatarLabels } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Profile() {
  const [profile] = useState(mockUserProfile);
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
                <span className="text-2xl font-bold text-foreground">{profile.streak} 🔥</span>
                <p className="text-xs text-muted-foreground">Day Streak</p>
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
            <span className="text-2xl font-bold text-foreground">{profile.totalCompleted}</span>
            <p className="text-xs text-muted-foreground">Challenges Completed</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {Math.round((profile.totalCompleted / profile.totalAttempted) * 100)}% completion rate
            </p>
          </CardContent>
        </Card>

        {/* Video Grid (3x3, edge-to-edge like IG) */}
        <div className="grid grid-cols-3 gap-0.5">
          {mockUserVideos.map((url, i) => (
            <div key={i} className="aspect-square bg-muted">
              <img src={url} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
