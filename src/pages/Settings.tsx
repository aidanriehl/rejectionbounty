import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Globe, Lock, LogOut, ChevronRight, User, KeyRound, Bell, CircleHelp, FileText, Trash2, Banknote, CheckCircle, Loader2 } from "lucide-react";
import AvatarDisplay from "@/components/AvatarDisplay";
import AvatarPicker from "@/components/AvatarPicker";
import { type AvatarType } from "@/lib/mock-data";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, profile: authProfile, signOut, setProfile: setAuthProfile } = useAuth();
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(authProfile?.username || "");
  const [isPublic, setIsPublic] = useState(true);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // Stripe Connect state
  const [connectStatus, setConnectStatus] = useState<{
    connected: boolean;
    onboarding_complete?: boolean;
    payouts_enabled?: boolean;
    email?: string;
  } | null>(null);
  const [connectLoading, setConnectLoading] = useState(true);
  const [connectLinking, setConnectLinking] = useState(false);

  // Check connect status on mount & after returning from Stripe
  useEffect(() => {
    checkConnectStatus();
  }, []);

  useEffect(() => {
    if (searchParams.get("connect") === "complete") {
      checkConnectStatus();
      toast({ title: "Bank account linked!", description: "Checking status..." });
    }
  }, [searchParams]);

  const checkConnectStatus = async () => {
    setConnectLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("check-connect-status");
      if (error) throw error;
      setConnectStatus(data);
    } catch (e) {
      console.error("Failed to check connect status:", e);
      setConnectStatus({ connected: false });
    } finally {
      setConnectLoading(false);
    }
  };

  const startConnectOnboarding = async () => {
    setConnectLinking(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-connect-account");
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      console.error("Failed to start connect onboarding:", e);
      toast({ title: "Error", description: "Failed to start bank linking. Please try again.", variant: "destructive" });
    } finally {
      setConnectLinking(false);
    }
  };

  const saveName = async () => {
    if (!user) return;
    const trimmed = nameValue.trim();
    if (!trimmed) return;

    const { data, error } = await supabase
      .from("profiles")
      .update({ username: trimmed })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      toast({ title: "Failed to update name", variant: "destructive" });
      return;
    }

    setAuthProfile(data as any);
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
                {authProfile?.username || "Set name"}
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>

        </div>

        {/* Avatar Section */}
        <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Avatar</p>
        <div className="mb-5 overflow-hidden rounded-xl border bg-card">
          <button
            onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            className="flex w-full items-center justify-between px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <AvatarDisplay avatar={(authProfile?.avatar || "dragon") as AvatarType} stage={(authProfile?.avatar_stage ?? 0) as any} size="sm" />
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
                selected={(authProfile?.avatar || "dragon") as AvatarType}
                onSelect={async (avatar: AvatarType) => {
                  if (!user) return;
                  await supabase.from("profiles").update({ avatar }).eq("id", user.id);
                  setAuthProfile({ ...authProfile!, avatar });
                }}
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
              {isPublic ? (
                <Globe className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Lock className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <span className="text-sm font-medium text-foreground">
                  {isPublic ? "Public Profile" : "Private Profile"}
                </span>
                <p className="text-xs text-muted-foreground">
                  {isPublic ? "Anyone can see your profile" : "Only friends can see your profile"}
                </p>
              </div>
            </div>
            <Switch
              checked={isPublic}
              onCheckedChange={setIsPublic}
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

        {/* Payouts Section */}
        <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Payouts</p>
        <div className="mb-5 overflow-hidden rounded-xl border bg-card">
          {connectLoading ? (
            <div className="flex items-center gap-3 px-4 py-4">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Checking payout status…</span>
            </div>
          ) : connectStatus?.onboarding_complete && connectStatus?.payouts_enabled ? (
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div>
                  <span className="text-sm font-medium text-foreground">Bank Account Linked</span>
                  <p className="text-xs text-muted-foreground">
                    You're eligible for weekly prize payouts
                  </p>
                </div>
              </div>
              <button
                onClick={startConnectOnboarding}
                className="text-xs font-semibold text-primary"
              >
                Update
              </button>
            </div>
          ) : connectStatus?.connected && !connectStatus?.onboarding_complete ? (
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <Banknote className="h-4 w-4 text-yellow-500" />
                <div>
                  <span className="text-sm font-medium text-foreground">Onboarding Incomplete</span>
                  <p className="text-xs text-muted-foreground">Finish linking your bank account</p>
                </div>
              </div>
              <button
                onClick={startConnectOnboarding}
                disabled={connectLinking}
                className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background disabled:opacity-50"
              >
                {connectLinking ? "Loading…" : "Continue"}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <Banknote className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="text-sm font-medium text-foreground">Link Bank Account</span>
                  <p className="text-xs text-muted-foreground">
                    Required to receive weekly prize pool winnings
                  </p>
                </div>
              </div>
              <button
                onClick={startConnectOnboarding}
                disabled={connectLinking}
                className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background disabled:opacity-50"
              >
                {connectLinking ? "Loading…" : "Link"}
              </button>
            </div>
          )}
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
          <button
            onClick={async () => {
              await signOut();
              navigate("/");
            }}
            className="flex w-full items-center gap-3 border-b px-4 py-3 text-sm font-medium text-foreground"
          >
            <LogOut className="h-4 w-4 text-muted-foreground" />
            Log Out
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-destructive">
                <Trash2 className="h-4 w-4" />
                Delete Account
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Account</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Your account and all data will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={async () => {
                    try {
                      const { error } = await supabase.functions.invoke("delete-account");
                      if (error) throw error;
                    } catch (e) {
                      console.error("Failed to delete account:", e);
                    }
                    await signOut();
                    navigate("/");
                    toast({ title: "Account deleted" });
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
