import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Trophy, ChevronUp, Crown, Skull } from "lucide-react";
import { cn } from "@/lib/utils";
import AvatarDisplay from "@/components/AvatarDisplay";
import type { AvatarType, AvatarStage } from "@/lib/mock-data";

interface ChallengeResult {
  title: string;
  emoji: string;
  completedBy: number;
  totalUsers: number;
  takeRate: number;
}

interface UserResult {
  username: string;
  avatar: AvatarType;
  avatarStage: AvatarStage;
  completed: number;
  isYou?: boolean;
}

interface WeeklySummaryProps {
  onContinue: () => void;
}

// Mock data for last week's results
const mockChallengeResults: ChallengeResult[] = [
  { title: "Ask a stranger for a high-five", emoji: "🖐️", completedBy: 1423, totalUsers: 1832, takeRate: 77.6 },
  { title: "Compliment someone's outfit", emoji: "👗", completedBy: 1201, totalUsers: 1832, takeRate: 65.6 },
  { title: "Request a discount at a store", emoji: "💰", completedBy: 987, totalUsers: 1832, takeRate: 53.9 },
  { title: "Sing in public for 10 seconds", emoji: "🎤", completedBy: 734, totalUsers: 1832, takeRate: 40.1 },
  { title: "Dance in an elevator", emoji: "🕺", completedBy: 612, totalUsers: 1832, takeRate: 33.4 },
  { title: "Ask for a free coffee", emoji: "☕", completedBy: 498, totalUsers: 1832, takeRate: 27.2 },
  { title: "Ask to cut in line", emoji: "🚶", completedBy: 345, totalUsers: 1832, takeRate: 18.8 },
  { title: "Ask for someone's number", emoji: "📱", completedBy: 234, totalUsers: 1832, takeRate: 12.8 },
  { title: "Return food at a restaurant", emoji: "🍽️", completedBy: 189, totalUsers: 1832, takeRate: 10.3 },
  { title: "Ask to use a stranger's phone", emoji: "☎️", completedBy: 112, totalUsers: 1832, takeRate: 6.1 },
];

const mockTopUsers: UserResult[] = [
  { username: "brave_sarah", avatar: "dragon", avatarStage: 3, completed: 10 },
  { username: "rejection_king", avatar: "fox", avatarStage: 2, completed: 9 },
  { username: "fearless_mike", avatar: "owl", avatarStage: 1, completed: 8 },
  { username: "DailyRejecter", avatar: "dragon", avatarStage: 2, completed: 7, isYou: true },
  { username: "courage_queen", avatar: "cat", avatarStage: 3, completed: 7 },
  { username: "no_fear_nina", avatar: "tree", avatarStage: 0, completed: 3 },
];

const mockNoShows: UserResult[] = [
  { username: "ghost_rider", avatar: "cat", avatarStage: 0, completed: 0 },
  { username: "lazy_larry", avatar: "owl", avatarStage: 0, completed: 0 },
  { username: "procrastinator", avatar: "tree", avatarStage: 0, completed: 0 },
];

const completedThreshold = 5;
const totalQualified = 892;
const totalUsers = 1832;

export default function WeeklySummary({ onContinue }: WeeklySummaryProps) {
  const [dismissed, setDismissed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, -200], [1, 0]);

  const handleDragEnd = (_: any, info: { offset: { y: number }; velocity: { y: number } }) => {
    if (info.offset.y < -80 || info.velocity.y < -300) {
      setDismissed(true);
      setTimeout(onContinue, 400);
    }
  };

  const youQualified = mockTopUsers.some((u) => u.isYou && u.completed >= completedThreshold);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto"
          style={{
            background: "linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(0 0% 4%) 40%)",
            y,
            opacity,
          }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.6, bottom: 0.1 }}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -300 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="px-4 pt-12 pb-4 text-center">
            <motion.p
              className="text-xs font-semibold tracking-widest uppercase text-primary-foreground/60"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Last Week's Recap
            </motion.p>
            <motion.h1
              className="mt-2 text-3xl font-extrabold text-primary-foreground"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              Weekly Summary
            </motion.h1>

            {/* Qualified banner */}
            {youQualified && (
              <motion.div
                className="mx-auto mt-4 flex items-center gap-2 rounded-full bg-success/20 px-4 py-2 w-fit"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <Trophy className="h-4 w-4 text-success" />
                <span className="text-sm font-bold text-success">You qualified for the prize pool!</span>
              </motion.div>
            )}

            <motion.p
              className="mt-3 text-sm text-primary-foreground/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {totalQualified.toLocaleString()} / {totalUsers.toLocaleString()} users completed 5+ challenges
            </motion.p>
          </div>

          {/* Challenge Take Rates */}
          <div className="px-4 mt-4">
            <motion.div
              className="rounded-xl border border-border/20 bg-card/10 backdrop-blur-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="px-4 py-3 border-b border-border/10">
                <h2 className="text-sm font-bold text-primary-foreground/80">Challenge Take Rates</h2>
              </div>
              {mockChallengeResults.map((challenge, i) => (
                <motion.div
                  key={challenge.title}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5",
                    i !== mockChallengeResults.length - 1 && "border-b border-border/5"
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                >
                  <span className="text-lg w-8 text-center">{challenge.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-primary-foreground/70 truncate">{challenge.title}</p>
                    <div className="mt-1 h-1.5 rounded-full bg-primary-foreground/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: challenge.takeRate > 50
                            ? "hsl(var(--success))"
                            : challenge.takeRate > 25
                            ? "hsl(var(--gold))"
                            : "hsl(var(--destructive) / 0.7)",
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${challenge.takeRate}%` }}
                        transition={{ delay: 0.7 + i * 0.05, duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-primary-foreground/60 w-12 text-right">
                    {challenge.takeRate}%
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Leaderboard */}
          <div className="px-4 mt-4">
            <motion.div
              className="rounded-xl border border-border/20 bg-card/10 backdrop-blur-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="px-4 py-3 border-b border-border/10">
                <h2 className="text-sm font-bold text-primary-foreground/80 flex items-center gap-2">
                  <Crown className="h-4 w-4 text-prize" /> Top Performers
                </h2>
              </div>
              {mockTopUsers.map((user, i) => (
                <motion.div
                  key={user.username}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5",
                    i !== mockTopUsers.length - 1 && "border-b border-border/5",
                    user.isYou && "bg-primary/10"
                  )}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.06 }}
                >
                  <span className="text-xs font-bold text-primary-foreground/40 w-5">#{i + 1}</span>
                  <AvatarDisplay avatar={user.avatar} stage={user.avatarStage as AvatarStage} size="sm" />
                  <span className={cn(
                    "flex-1 text-sm font-medium text-primary-foreground/70",
                    user.isYou && "text-primary font-bold"
                  )}>
                    {user.username} {user.isYou && "(you)"}
                  </span>
                  <span className={cn(
                    "text-xs font-bold px-2 py-0.5 rounded-full",
                    user.completed >= completedThreshold
                      ? "bg-success/20 text-success"
                      : "bg-destructive/20 text-destructive"
                  )}>
                    {user.completed}/10
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* No-shows */}
          <div className="px-4 mt-4 mb-6">
            <motion.div
              className="rounded-xl border border-border/20 bg-card/10 backdrop-blur-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="px-4 py-3 border-b border-border/10">
                <h2 className="text-sm font-bold text-primary-foreground/80 flex items-center gap-2">
                  <Skull className="h-4 w-4 text-destructive/70" /> Didn't show up
                </h2>
              </div>
              {mockNoShows.map((user, i) => (
                <div
                  key={user.username}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5",
                    i !== mockNoShows.length - 1 && "border-b border-border/5"
                  )}
                >
                  <AvatarDisplay avatar={user.avatar} stage={user.avatarStage as AvatarStage} size="sm" />
                  <span className="flex-1 text-sm font-medium text-primary-foreground/40">
                    {user.username}
                  </span>
                  <span className="text-xs font-bold text-destructive/50">0/10</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Swipe indicator */}
          <motion.div
            className="sticky bottom-0 pb-8 pt-4 flex flex-col items-center"
            style={{
              background: "linear-gradient(0deg, hsl(0 0% 4%) 60%, transparent 100%)",
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronUp className="h-5 w-5 text-primary-foreground/40" />
            <p className="text-xs font-semibold text-primary-foreground/40 mt-1">Swipe up for new challenges</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
