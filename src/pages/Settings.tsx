import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, Lock, LogOut } from "lucide-react";
import AvatarDisplay from "@/components/AvatarDisplay";
import AvatarPicker from "@/components/AvatarPicker";
import { mockUserProfile, type AvatarType } from "@/lib/mock-data";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(mockUserProfile);

  return (
    <div className="min-h-screen pb-24 pt-4">
      <div className="mx-auto max-w-lg px-4">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </div>

        {/* Avatar section */}
        <div className="mb-4 rounded-xl border bg-card p-4">
          <div className="mb-3 flex items-center gap-3">
            <AvatarDisplay avatar={profile.avatar} stage={profile.avatarStage} size="md" />
            <div>
              <p className="text-sm font-semibold text-foreground">Avatar</p>
              <p className="text-xs text-muted-foreground">Choose your character</p>
            </div>
          </div>
          <AvatarPicker
            selected={profile.avatar}
            onSelect={(avatar: AvatarType) => setProfile({ ...profile, avatar })}
          />
        </div>

        {/* Privacy toggle */}
        <div className="mb-4 flex items-center justify-between rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2">
            {profile.isPublic ? (
              <Globe className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Lock className="h-4 w-4 text-muted-foreground" />
            )}
            <div>
              <span className="text-sm font-medium text-foreground">
                {profile.isPublic ? "Public profile" : "Private profile"}
              </span>
              <p className="text-xs text-muted-foreground">
                {profile.isPublic ? "Anyone can see your videos" : "Only friends can see your videos"}
              </p>
            </div>
          </div>
          <Switch
            checked={profile.isPublic}
            onCheckedChange={(checked) => setProfile({ ...profile, isPublic: checked })}
          />
        </div>

        {/* Subscription */}
        <div className="mb-4 flex items-center justify-between rounded-xl border bg-card p-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Free Trial</p>
            <p className="text-xs text-muted-foreground">23 days remaining</p>
          </div>
          <button className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background">
            Subscribe
          </button>
        </div>

        {/* Logout */}
        <button className="flex w-full items-center gap-2 rounded-xl border bg-card p-4 text-sm font-medium text-destructive">
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </div>
  );
}
