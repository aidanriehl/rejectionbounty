import { useState } from "react";
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
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const completed = getCompletedCount(challenges);
  const { days, hours } = getTimeUntilSunday();
  const prizePool = 1247;
  const subscribers = 1832;

  const toggleChallenge = (id: string) => {
    setChallenges((prev) => {
      const next = prev.map((c) =>
        c.id === id ? { ...c, completed: !c.completed } : c
      );
      const newCount = getCompletedCount(next);
      const wasCompleting = newCount > completed;

      if (wasCompleting && newCount <= 5) {
        // Haptic
        if (navigator.vibrate) navigator.vibrate(50);
        // Confetti
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
          toast({
            title: `${newCount}/5 ${msg}`,
          });
        }
      }

      return next;
    });
  };

  return (
    <div className="min-h-screen pb-24 pt-4">
      <div className="mx-auto max-w-lg px-4">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-foreground">Daily Rejection</h1>
          <p className="mt-1 text-sm text-muted-foreground">This week's challenges</p>
        </div>

        {/* Subscriber count */}
        <div className="mb-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{subscribers.toLocaleString()} subscribers</span>
        </div>

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

        {/* Challenge List */}
        <div className="space-y-2">
          <AnimatePresence>
            {challenges.map((challenge, i) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className={cn(
                  "group overflow-hidden rounded-xl border bg-card p-3.5 transition-all",
                  challenge.completed
                    ? "border-success/30 bg-success/5"
                    : "hover:border-primary/20"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-xl">{challenge.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={cn(
                        "text-sm font-semibold text-foreground",
                        challenge.completed && "line-through opacity-50"
                      )}
                    >
                      {challenge.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                      {challenge.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {challenge.completed && !challenge.hasVideo && (
                      <button className="flex h-7 items-center gap-1 rounded-full bg-primary/10 px-2.5 text-xs font-medium text-primary">
                        <Upload className="h-3 w-3" />
                      </button>
                    )}
                    {challenge.hasVideo && (
                      <span className="text-xs text-muted-foreground">📹</span>
                    )}
                    <button
                      onClick={() => toggleChallenge(challenge.id)}
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all",
                        challenge.completed
                          ? "border-success bg-success text-success-foreground"
                          : "border-muted-foreground/30 hover:border-primary"
                      )}
                    >
                      {challenge.completed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <Check className="h-4 w-4" strokeWidth={3} />
                        </motion.div>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
