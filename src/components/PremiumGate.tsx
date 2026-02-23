import { motion, AnimatePresence } from "framer-motion";
import { Crown, X } from "lucide-react";

interface PremiumGateProps {
  open: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

export default function PremiumGate({ open, onClose, onSubscribe }: PremiumGateProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-t-2xl bg-card p-6 pb-10"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Crown className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Premium Feature</h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mb-2 text-sm text-muted-foreground">
              Unlock video uploads, the weekly prize pool, and compete with your friends.
            </p>
            <p className="mb-6 text-sm text-muted-foreground">
              Subscribe to get full access to all challenges.
            </p>

            <button
              onClick={onSubscribe}
              className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Subscribe — $3.99/mo
            </button>

            <button
              onClick={onClose}
              className="mt-2 w-full py-2 text-sm text-muted-foreground"
            >
              Maybe later
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
