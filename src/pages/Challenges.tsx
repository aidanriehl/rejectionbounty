import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, Crown, Trophy, Upload, Users, Video, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockChallenges, getCompletedCount, getTimeUntilSunday, getCurrentWeekKey, type Challenge } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { fireConfetti, fireBigConfetti, fireEpicConfetti } from "@/lib/confetti";
import { playPop, playBigWin, playEpicWin, playCascade } from "@/lib/sounds";
import { toast } from "@/hooks/use-toast";
import CameraRecorder from "@/components/CameraRecorder";
import WeeklySummary from "@/components/WeeklySummary";
import DropReveal from "@/components/DropReveal";
import PremiumGate from "@/components/PremiumGate";

const progressMessages: Record<number, string> = {
  1: "Great start!",
  2: "Keep going...",
  3: "Over halfway!",
  4: "One more to go!",
  5: "🔥 Goal reached!",
  6: "Going above & beyond!",
  7: "On fire!",
  8: "Unstoppable!",
  9: "One more for perfection!",
  10: "🏆 LEGEND!",
};

export default function Challenges() {
  const navigate = useNavigate();
  const weekKey = getCurrentWeekKey();
  const [dropRevealed, setDropRevealed] = useState(() => localStorage.getItem(weekKey) === "true");
  const [summaryDone, setSummaryDone] = useState(() => localStorage.getItem(weekKey) === "true");
  const [justRevealed, setJustRevealed] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [choiceChallenge, setChoiceChallenge] = useState<Challenge | null>(null);
  const [cameraChallenge, setCameraChallenge] = useState<Challenge | null>(null);
  const [showPremiumGate, setShowPremiumGate] = useState(false);
  const [pendingUncheck, setPendingUncheck] = useState<string | null>(null);

  // TODO: Replace with real subscription check from Apple IAP
  const isPremium = false;
  const completed = getCompletedCount(challenges);
  const { days, hours } = getTimeUntilSunday();
  const prizePool = 1247;
  const subscribers = 1832;

  const handleRevealComplete = () => {
    localStorage.setItem(weekKey, "true");
    setDropRevealed(true);
    setJustRevealed(true);
    playCascade(10, 900);
    setTimeout(() => setJustRevealed(false), 2500);
  };

  const handleChallengeClick = (id: string) => {
    const challenge = challenges.find((c) => c.id === id);
    if (!challenge) return;

    if (challenge.completed) {
      setPendingUncheck(id);
      return;
    }

    doToggle(id);
  };

  const doToggle = (id: string) => {
    setChallenges((prev) => {
      const challenge = prev.find((c) => c.id === id);
      if (!challenge) return prev;

      const next = prev.map((c) =>
        c.id === id ? { ...c, completed: !c.completed } : c
      );

      if (!challenge.completed) {
        const newCount = getCompletedCount(next);
        if (newCount === 10) {
          fireEpicConfetti();
          playEpicWin();
          if (navigator.vibrate) navigator.vibrate([200, 80, 200, 80, 200, 80, 400]);
        } else if (newCount === 5) {
          fireBigConfetti();
          playBigWin();
          if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
        } else {
          fireConfetti();
          playPop();
          if (navigator.vibrate) navigator.vibrate(50);
        }
      }

      return next;
    });
  };


  return (
    <>
      <AnimatePresence>
        {!summaryDone && <WeeklySummary onContinue={() => setSummaryDone(true)} />}
      </AnimatePresence>
      <AnimatePresence>
        {summaryDone && !dropRevealed && <DropReveal onRevealComplete={handleRevealComplete} />}
      </AnimatePresence>
    <div className="min-h-screen pb-24 pt-10">
      <div className="mx-auto max-w-lg px-4">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-foreground">This Week's Drop</h1>
          <p className="mt-1 text-sm text-muted-foreground">Resets every Sunday</p>
        </div>

        {/* Subscriber Card + Prize Pool wrapper for tour */}
        <div data-tour="prize-pool">
        {isPremium ? (
          <div className="mb-3 overflow-hidden rounded-xl bg-foreground p-4 text-background">
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
          </div>
        ) : (
          <button
            onClick={() => setShowPremiumGate(true)}
            className="mb-3 w-full overflow-hidden rounded-xl bg-foreground p-4 text-background text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/10">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium opacity-60">Subscribers</p>
                  <div className="h-8"><p className="text-2xl font-bold blur-md select-none">1,832</p></div>
                </div>
              </div>
              <Crown className="h-5 w-5 opacity-40" />
            </div>
          </button>
        )}

        {/* Prize Pool Card */}
        {isPremium ? (
          <div className="mb-5 overflow-hidden rounded-xl bg-foreground p-4 text-background">
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
          </div>
        ) : (
          <button
            onClick={() => setShowPremiumGate(true)}
            className="mb-5 w-full overflow-hidden rounded-xl bg-foreground p-4 text-background text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/10">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium opacity-60">Weekly Prize Pool</p>
                  <div className="h-8"><p className="text-2xl font-bold blur-md select-none">$1,247</p></div>
                </div>
              </div>
              <Crown className="h-5 w-5 opacity-40" />
            </div>
          </button>
        )}
        </div>{/* end data-tour="prize-pool" */}

        {/* Progress */}
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm font-semibold text-primary">
              {completed}/5 {progressMessages[completed] || ""}
            </span>
          </div>
          <Progress value={Math.min((completed / 5) * 100, 100)} className="h-2 bg-muted" />
        </div>

        {/* Challenge List */}
        <p className="mb-2 text-sm font-semibold text-foreground">Complete 5 challenges of these 10</p>
        <div data-tour="challenge-list" className="overflow-hidden rounded-xl border bg-card">
          <AnimatePresence>
            {challenges.map((challenge, i) => (
              <motion.div
                key={challenge.id}
                initial={justRevealed ? { opacity: 0, y: -200, scale: 0.6, rotate: -8 } : false}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                transition={justRevealed
                  ? { delay: i * 0.12, type: "spring", stiffness: 300, damping: 18 }
                  : { duration: 0 }
                }
                className={cn(
                  "group flex items-center gap-3 px-4 py-3 transition-all",
                  i !== challenges.length - 1 && "border-b",
                  challenge.completed && "bg-success/5"
                )}
              >
                {/* Number — tap to toggle */}
                <button
                  onClick={() => handleChallengeClick(challenge.id)}
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    challenge.completed
                      ? "bg-success text-success-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {challenge.completed ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                </button>

                {/* Title — tap row to toggle */}
                <button
                  onClick={() => handleChallengeClick(challenge.id)}
                  className={cn(
                    "flex-1 text-left text-sm font-medium text-foreground",
                    challenge.completed && "line-through opacity-50"
                  )}
                >
                  {challenge.title} {challenge.emoji}
                </button>

                {/* Upload button — always visible */}
                <button
                  {...(i === 0 ? { "data-tour": "upload-btn" } : {})}
                  onClick={() => isPremium ? setChoiceChallenge(challenge) : setShowPremiumGate(true)}
                  className="flex h-7 items-center gap-1 rounded-full bg-primary/10 px-2.5 text-xs font-medium text-primary"
                >
                  <Upload className="h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Choice modal: Record or Upload */}
      <AnimatePresence>
        {choiceChallenge && !cameraChallenge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setChoiceChallenge(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-t-2xl bg-card p-5 pb-8"
            >
              <p className="mb-1 text-lg font-bold text-foreground">Add Accountability Video</p>
              <p className="mb-5 text-sm text-muted-foreground">{choiceChallenge.title}</p>

              <button
                onClick={() => {
                  setCameraChallenge(choiceChallenge);
                  setChoiceChallenge(null);
                }}
                className="mb-3 flex w-full items-center gap-3 rounded-xl border bg-muted/30 px-4 py-4 text-left transition-colors hover:bg-muted/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Record Now</p>
                  <p className="text-xs text-muted-foreground">Film directly in the app</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setChoiceChallenge(null);
                  navigate("/post", { state: { challengeTitle: choiceChallenge.title } });
                }}
                className="mb-3 flex w-full items-center gap-3 rounded-xl border bg-muted/30 px-4 py-4 text-left transition-colors hover:bg-muted/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FolderOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Upload from Library</p>
                  <p className="text-xs text-muted-foreground">Choose a video from your camera roll</p>
                </div>
              </button>

              <button
                onClick={() => setChoiceChallenge(null)}
                className="mt-1 w-full py-2 text-sm text-muted-foreground"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen camera recorder */}
      <AnimatePresence>
        {cameraChallenge && (
          <CameraRecorder
            challengeTitle={cameraChallenge.title}
            onClose={() => setCameraChallenge(null)}
            onRecorded={(file) => {
              doToggle(cameraChallenge.id);
              setCameraChallenge(null);
              
              navigate("/post", { state: { challengeTitle: cameraChallenge.title, recordedFile: file.name } });
            }}
          />
        )}
      </AnimatePresence>

      {/* Undo confirmation — iOS low battery style */}
      <AnimatePresence>
        {pendingUncheck && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setPendingUncheck(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              onClick={(e) => e.stopPropagation()}
              className="w-72 overflow-hidden rounded-2xl bg-card shadow-xl"
            >
              <div className="px-6 pt-6 pb-4 text-center">
                <p className="text-base font-semibold text-foreground">Undo this challenge?</p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Click this by accident?
                </p>
              </div>
              <div className="border-t border-border flex">
                <button
                  onClick={() => setPendingUncheck(null)}
                  className="flex-1 py-3 text-sm font-medium text-primary border-r border-border"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    doToggle(pendingUncheck);
                    setPendingUncheck(null);
                  }}
                  className="flex-1 py-3 text-sm font-semibold text-destructive"
                >
                  Yes, Undo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium gate modal */}
      <PremiumGate
        open={showPremiumGate}
        onClose={() => setShowPremiumGate(false)}
        onSubscribe={() => {
          setShowPremiumGate(false);
          toast({ title: "Coming soon!", description: "In-app purchases will be available soon." });
        }}
      />
    </div>
    </>
  );
}
