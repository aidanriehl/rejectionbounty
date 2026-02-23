import { useLocation, useNavigate } from "react-router-dom";
import { Home, Flame, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { path: "/", icon: Home },
  { path: "/challenges", icon: Flame },
  { path: "/profile", icon: User },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg",
      location.pathname !== "/" && "border-t border-border"
    )}>
      <div className="mx-auto flex max-w-lg items-center justify-around py-3">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={cn(
                "flex items-center justify-center rounded-full p-3 transition-colors",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="h-6 w-6" strokeWidth={active ? 2.5 : 1.5} />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
