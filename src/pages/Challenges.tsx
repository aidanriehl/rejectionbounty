import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, DollarSign, Trophy, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockChallenges, getCompletedCount, getTimeUntilSunday, type Challenge } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const completed = getCompletedCount(challenges);
  const { days, hours } = getTimeUntilSunday();
  const prizePool = 1247;

  const toggleChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, completed: !c.completed } : c
      )
    );
  };

  return (
    <div className="min-h-screen pb-24 pt-4">
      <div className="mx-auto max-w-lg px-4">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-foreground">
            Daily Rejection 🔥
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            This week's challenges
          </p>
        </div>

        {/* Prize Pool Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-secondary p-4 text-primary-foreground shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/20">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-medium opacity-80">Weekly Prize Pool</p>
                <p className="text-2xl font-bold">${prizePool.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-xs opacity-80">
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
            <span className="text-sm font-semibold text-foreground">
              Progress
            </span>
            <span className="text-sm font-bold text-primary">
              {completed}/5 completed
            </span>
          </div>
          <Progress value={(completed / 5) * 100} className="h-3 bg-muted" />
        </div>

        {/* Challenge List */}
        <div className="space-y-3">
          <AnimatePresence>
            {challenges.map((challenge, i) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border-2 bg-card p-4 transition-all",
                  challenge.completed
                    ? "border-success/40 bg-success/5"
                    : "border-transparent hover:border-primary/20"
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Emoji */}
                  <span className="text-2xl">{challenge.emoji}</span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={cn(
                        "font-semibold text-foreground",
                        challenge.completed && "line-through opacity-60"
                      )}
                    >
                      {challenge.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                      {challenge.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {challenge.completed && !challenge.hasVideo && (
                      <button className="flex h-8 items-center gap-1 rounded-full bg-primary/10 px-3 text-xs font-semibold text-primary transition-colors hover:bg-primary/20">
                        <Upload className="h-3 w-3" />
                        <span className="hidden sm:inline">Video</span>
                      </button>
                    )}
                    {challenge.hasVideo && (
                      <span className="flex h-8 items-center gap-1 rounded-full bg-secondary/10 px-3 text-xs font-semibold text-secondary">
                        📹 Posted
                      </span>
                    )}
                    <button
                      onClick={() => toggleChallenge(challenge.id)}
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all",
                        challenge.completed
                          ? "border-success bg-success text-success-foreground"
                          : "border-muted-foreground/30 hover:border-primary hover:bg-primary/5"
                      )}
                    >
                      {challenge.completed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <Check className="h-5 w-5" strokeWidth={3} />
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
