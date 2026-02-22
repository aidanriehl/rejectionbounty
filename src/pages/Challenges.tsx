import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, Trophy, Upload, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockChallenges, getCompletedCount, getTimeUntilSunday, type Challenge } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { fireConfetti, fireBigConfetti } from "@/lib/confetti";
import { playPop, playBigWin } from "@/lib/sounds";
import { toast } from "@/hooks/use-toast";

const progressMessages = [
  "", // 0
  "Great start!",
  "We're getting somewhere...",
  "Halfway there!",
  "One more to go!",
  "You crushed it this week!",
];

export default function Challenges() {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const completed = getCompletedCount(challenges);
  const { days, hours } = getTimeUntilSunday();
  const prizePool = 1247;
  const subscribers = 1832;

  const toggleChallenge = (id: string) => {
    setChallenges((prev) => {
      const challenge = prev.find((c) => c.id === id);
      if (!challenge) return prev;

      // If not completed yet, complete it and open upload modal
      if (!challenge.completed) {
        const next = prev.map((c) =>
          c.id === id ? { ...c, completed: true } : c
        );
        const newCount = getCompletedCount(next);

        // Haptic
        if (navigator.vibrate) navigator.vibrate(50);
        // Confetti + sound
        if (newCount === 5) {
          fireBigConfetti();
          playBigWin();
        } else {
          fireConfetti();
          playPop();
        }
        // Toast
        const msg = progressMessages[newCount];
        if (msg) {
          toast({ title: `${newCount}/5 ${msg}` });
        }

        // Navigate to post page
        setTimeout(() => navigate("/post", { state: { challengeTitle: challenge.title } }), 300);

        return next;
      }

      // If already completed, uncomplete
      return prev.map((c) =>
        c.id === id ? { ...c, completed: false } : c
      );
    });
  };


  return (
    <div className="min-h-screen pb-24 pt-4">
      <div className="mx-auto max-w-lg px-4">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-foreground">This Week's Drop</h1>
          <p className="mt-1 text-sm text-muted-foreground">Resets every Sunday</p>
        </div>

        {/* Subscriber Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 overflow-hidden rounded-xl bg-foreground p-4 text-background"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/10">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium opacity-60">Subscribers</p>
                <p className="text-2xl font-bold">{subscribers.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-60 leading-tight">Monthly pool increases</p>
              <p className="text-xs opacity-60 leading-tight">per subscriber</p>
              <p className="text-lg font-bold">+$3.12</p>
            </div>
          </div>
        </motion.div>

        {/* Prize Pool Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 overflow-hidden rounded-xl bg-foreground p-4 text-background"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/10">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium opacity-60">Weekly Prize Pool</p>
                <p className="text-2xl font-bold">${prizePool.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-xs opacity-60">
                <Clock className="h-3 w-3" />
                <span>Resets in</span>
              </div>
              <p className="text-lg font-bold">{days}d {hours}h</p>
            </div>
          </div>
        </motion.div>

        {/* Progress */}
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm font-semibold text-primary">
              {completed}/5 {completed > 0 && completed <= 5 ? progressMessages[completed] : ""}
            </span>
          </div>
          <Progress value={(Math.min(completed, 5) / 5) * 100} className="h-2 bg-muted" />
        </div>

        {/* Challenge List — unified pill container */}
        <div className="overflow-hidden rounded-xl border bg-card">
          <AnimatePresence>
            {challenges.map((challenge, i) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className={cn(
                  "group flex items-center gap-3 px-4 py-3 transition-all",
                  i !== challenges.length - 1 && "border-b",
                  challenge.completed && "bg-success/5"
                )}
              >
                {/* Number */}
                <span className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  challenge.completed
                    ? "bg-success text-success-foreground"
                    : "bg-muted text-muted-foreground"
                )}>
                  {challenge.completed ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                </span>

                {/* Title only */}
                <button
                  onClick={() => toggleChallenge(challenge.id)}
                  className="flex-1 text-left"
                >
                  <span className={cn(
                    "text-sm font-medium text-foreground",
                    challenge.completed && "line-through opacity-50"
                  )}>
                    {challenge.title}
                  </span>
                </button>

                {/* Upload indicator */}
                <div className="flex items-center gap-2">
                  {challenge.completed && !challenge.hasVideo && (
                    <button
                      onClick={() => navigate("/post", { state: { challengeTitle: challenge.title } })}
                      className="flex h-7 items-center gap-1 rounded-full bg-primary/10 px-2.5 text-xs font-medium text-primary"
                    >
                      <Upload className="h-3 w-3" />
                    </button>
                  )}
                  {challenge.hasVideo && (
                    <span className="text-xs text-muted-foreground">📹</span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
