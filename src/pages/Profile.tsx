import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Lock, Globe } from "lucide-react";
import AvatarDisplay from "@/components/AvatarDisplay";
import AvatarPicker from "@/components/AvatarPicker";
import { mockUserProfile, mockUserVideos, avatarLabels, type AvatarType } from "@/lib/mock-data";
import { Switch } from "@/components/ui/switch";

export default function Profile() {
  const [profile, setProfile] = useState(mockUserProfile);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="min-h-screen pb-24 pt-4">
      <div className="mx-auto max-w-lg px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Settings className="h-5 w-5" />
          </button>
        </div>

        {/* Avatar + Name (centered, Instagram style) */}
        <div className="mb-6 flex flex-col items-center">
          <button onClick={() => setShowPicker(!showPicker)}>
            <AvatarDisplay avatar={profile.avatar} stage={profile.avatarStage} size="lg" />
          </button>
          <p className="mt-1 text-xs text-muted-foreground">{avatarLabels[profile.avatarStage]}</p>
          <h2 className="mt-2 text-lg font-bold text-foreground">{profile.username}</h2>
          <p className="text-xs text-muted-foreground">Member since {profile.memberSince}</p>
        </div>

        {/* Avatar Picker (toggle) */}
        {showPicker && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 overflow-hidden rounded-xl border bg-card p-4"
          >
            <p className="mb-3 text-center text-sm font-medium text-foreground">Choose your avatar</p>
            <AvatarPicker
              selected={profile.avatar}
              onSelect={(avatar: AvatarType) => setProfile({ ...profile, avatar })}
            />
          </motion.div>
        )}

        {/* Stats Row (Instagram style) */}
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

        {/* Privacy toggle */}
        <div className="mb-6 flex items-center justify-between rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2">
            {profile.isPublic ? (
              <Globe className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Lock className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="text-sm font-medium text-foreground">
              {profile.isPublic ? "Public profile" : "Private profile"}
            </span>
          </div>
          <Switch
            checked={profile.isPublic}
            onCheckedChange={(checked) => setProfile({ ...profile, isPublic: checked })}
          />
        </div>

        {/* Video Grid (3x3) */}
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
