import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Grid3X3 } from "lucide-react";
import AvatarDisplay from "@/components/AvatarDisplay";
import { mockUserProfile, mockUserVideos, avatarLabels } from "@/lib/mock-data";

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

        {/* Profile header — avatar left, stats right (IG style) */}
        <div className="mb-4 flex items-center gap-5">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <AvatarDisplay avatar={profile.avatar} stage={profile.avatarStage} size="lg" />
            <p className="mt-1 text-[10px] text-muted-foreground">{avatarLabels[profile.avatarStage]}</p>
          </div>

          {/* Stats */}
          <div className="flex flex-1 justify-around">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{profile.totalCompleted}</p>
              <p className="text-[11px] text-muted-foreground">Challenges</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{profile.streak}</p>
              <p className="text-[11px] text-muted-foreground">Streak</p>
            </div>
            <button onClick={() => navigate("/friends")} className="text-center">
              <p className="text-lg font-bold text-foreground">{profile.friends}</p>
              <p className="text-[11px] text-muted-foreground">Friends</p>
            </button>
          </div>
        </div>

        {/* Name + bio area */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-foreground">{profile.username}</p>
          <p className="text-xs text-muted-foreground">Member since {profile.memberSince}</p>
        </div>

        {/* Grid tab */}
        <div className="mb-0.5 flex border-b">
          <div className="flex flex-1 items-center justify-center py-2.5 border-b-2 border-foreground text-foreground">
            <Grid3X3 className="h-5 w-5" />
          </div>
        </div>

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
