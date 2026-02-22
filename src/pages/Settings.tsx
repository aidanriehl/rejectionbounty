import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Globe, Lock, LogOut, ChevronRight, User, KeyRound, Bell, CircleHelp, FileText, Trash2 } from "lucide-react";
import AvatarDisplay from "@/components/AvatarDisplay";
import AvatarPicker from "@/components/AvatarPicker";
import { mockUserProfile, type AvatarType } from "@/lib/mock-data";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(mockUserProfile);
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(profile.username);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const saveName = () => {
    setProfile({ ...profile, username: nameValue });
    setEditingName(false);
    toast({ title: "Name updated" });
  };

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

        {/* Account Section */}
        <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account</p>
        <div className="mb-5 overflow-hidden rounded-xl border bg-card">
          {/* Display Name */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Display Name</span>
            </div>
            {editingName ? (
              <div className="flex items-center gap-2">
                <input
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  className="w-32 rounded-lg border bg-muted/30 px-2 py-1 text-right text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && saveName()}
                />
                <button onClick={saveName} className="text-xs font-semibold text-primary">Save</button>
              </div>
            ) : (
              <button onClick={() => setEditingName(true)} className="flex items-center gap-1 text-sm text-muted-foreground">
                {profile.username}
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Email (read-only placeholder) */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">📧</span>
              <span className="text-sm font-medium text-foreground">Email</span>
            </div>
            <span className="text-sm text-muted-foreground">user@example.com</span>
          </div>

          {/* Change Password */}
          <button className="flex w-full items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <KeyRound className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Change Password</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Avatar Section */}
        <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Avatar</p>
        <div className="mb-5 overflow-hidden rounded-xl border bg-card">
          <button
            onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            className="flex w-full items-center justify-between px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <AvatarDisplay avatar={profile.avatar} stage={profile.avatarStage} size="sm" />
              <div className="text-left">
                <span className="text-sm font-medium text-foreground">Character</span>
                <p className="text-xs text-muted-foreground">Choose your avatar</p>
              </div>
            </div>
            <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${showAvatarPicker ? "rotate-90" : ""}`} />
          </button>
          {showAvatarPicker && (
            <div className="border-t px-4 py-3">
              <AvatarPicker
                selected={profile.avatar}
                onSelect={(avatar: AvatarType) => setProfile({ ...profile, avatar })}
              />
            </div>
          )}
        </div>

        {/* Preferences Section */}
        <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preferences</p>
        <div className="mb-5 overflow-hidden rounded-xl border bg-card">
          {/* Privacy */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-3">
              {profile.isPublic ? (
                <Globe className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Lock className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <span className="text-sm font-medium text-foreground">
                  {profile.isPublic ? "Public Profile" : "Private Profile"}
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

          {/* Notifications */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-sm font-medium text-foreground">Notifications</span>
                <p className="text-xs text-muted-foreground">Weekly reminders & friend activity</p>
              </div>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
        </div>

        {/* Subscription */}
        <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subscription</p>
        <div className="mb-5 flex items-center justify-between rounded-xl border bg-card p-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Free Trial</p>
            <p className="text-xs text-muted-foreground">23 days remaining</p>
          </div>
          <button className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background">
            Subscribe
          </button>
        </div>

        {/* Support */}
        <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Support</p>
        <div className="mb-5 overflow-hidden rounded-xl border bg-card">
          <button className="flex w-full items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-3">
              <CircleHelp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Help & FAQ</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="flex w-full items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Terms & Privacy</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Danger Zone */}
        <div className="mb-4 overflow-hidden rounded-xl border bg-card">
          <button className="flex w-full items-center gap-3 border-b px-4 py-3 text-sm font-medium text-foreground">
            <LogOut className="h-4 w-4 text-muted-foreground" />
            Log Out
          </button>
          <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-destructive">
            <Trash2 className="h-4 w-4" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
