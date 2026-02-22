import { useLocation, useNavigate } from "react-router-dom";
import { Flame, Play, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { path: "/", label: "Challenges", icon: Flame },
  { path: "/feed", label: "Feed", icon: Play },
  { path: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg safe-area-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-2xl px-6 py-2 transition-all",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className={cn("h-6 w-6", active && "animate-bounce-in")} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[11px] font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
