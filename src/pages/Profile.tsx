import { motion } from "framer-motion";
import { Flame, Leaf, Settings, Trophy, Users } from "lucide-react";

function PlantVisual({ streak }: { streak: number }) {
  // Visual stages: 0=dead, 1-2=seedling, 3-4=growing, 5+=thriving
  const stage = Math.min(streak, 5);
  const plants = ["🥀", "🌱", "🌿", "🪴", "🌳", "🌲"];
  const labels = ["Wilted", "Seedling", "Sprouting", "Growing", "Thriving", "Mighty Oak"];
  const bgColors = [
    "from-destructive/10 to-destructive/5",
    "from-success/5 to-success/10",
    "from-success/10 to-success/15",
    "from-success/15 to-success/20",
    "from-success/20 to-success/25",
    "from-success/25 to-secondary/20",
  ];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`flex flex-col items-center rounded-3xl bg-gradient-to-b ${bgColors[stage]} p-8`}
    >
      <motion.span
        className="text-7xl"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        {plants[stage]}
      </motion.span>
      <p className="mt-3 text-lg font-bold text-foreground">{labels[stage]}</p>
      <p className="text-sm text-muted-foreground">
        {streak === 0
          ? "Complete 5 challenges to start growing!"
          : `${streak} week streak — keep it alive!`}
      </p>
    </motion.div>
  );
}

export default function Profile() {
  const streak = 4;
  const totalCompleted = 47;
  const activeUsers = 1832;
  const prizePool = 1247;

  return (
    <div className="min-h-screen pb-24 pt-4">
      <div className="mx-auto max-w-lg px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Profile 👤</h1>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80">
            <Settings className="h-5 w-5" />
          </button>
        </div>

        {/* User info */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-2xl font-bold text-primary-foreground">
            DR
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">DailyRejecter</h2>
            <p className="text-sm text-muted-foreground">Member since Jan 2026</p>
          </div>
        </div>

        {/* Plant Visual */}
        <div className="mb-6">
          <PlantVisual streak={streak} />
        </div>

        {/* Stats Grid */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border bg-card p-4"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Flame className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{streak}</p>
            <p className="text-xs text-muted-foreground">Week Streak</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border bg-card p-4"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
              <Leaf className="h-5 w-5 text-secondary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{totalCompleted}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border bg-card p-4"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
              <Users className="h-5 w-5 text-accent" />
            </div>
            <p className="text-2xl font-bold text-foreground">{activeUsers.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Active Users</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl border bg-card p-4"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-prize/10">
              <Trophy className="h-5 w-5 text-prize" />
            </div>
            <p className="text-2xl font-bold text-foreground">${prizePool.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Prize Pool</p>
          </motion.div>
        </div>

        {/* Subscription */}
        <div className="rounded-2xl border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">Free Trial</p>
              <p className="text-sm text-muted-foreground">23 days remaining</p>
            </div>
            <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
