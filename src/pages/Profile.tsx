import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import AvatarDisplay from "@/components/AvatarDisplay";
import { mockUserProfile, mockUserVideos, avatarLabels } from "@/lib/mock-data";

export default function Profile() {
  const [profile] = useState(mockUserProfile);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 pt-4">
      <div className="mx-auto max-w-lg px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <button
            onClick={() => navigate("/settings")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>

        {/* Avatar + Name */}
        <div className="mb-6 flex flex-col items-center">
          <AvatarDisplay avatar={profile.avatar} stage={profile.avatarStage} size="lg" />
          <p className="mt-1 text-xs text-muted-foreground">{avatarLabels[profile.avatarStage]}</p>
          <h2 className="mt-2 text-lg font-bold text-foreground">{profile.username}</h2>
          <p className="text-xs text-muted-foreground">Member since {profile.memberSince}</p>
        </div>

        {/* Stats Row */}
        <div className="mb-6 flex items-center justify-around rounded-xl border bg-card py-4">
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{profile.totalCompleted}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{profile.streak}</p>
            <p className="text-xs text-muted-foreground">Streak</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{profile.friends}</p>
            <p className="text-xs text-muted-foreground">Friends</p>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-3 gap-0.5 overflow-hidden rounded-xl">
          {mockUserVideos.map((url, i) => (
            <div key={i} className="aspect-square bg-muted">
              <img src={url} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        {/* Subscription */}
        <div className="mt-6 rounded-xl border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Free Trial</p>
              <p className="text-xs text-muted-foreground">23 days remaining</p>
            </div>
            <button className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
