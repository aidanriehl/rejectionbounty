import { cn } from "@/lib/utils";
import { avatarEmojis, type AvatarType, type AvatarStage } from "@/lib/mock-data";
import { Plus } from "lucide-react";

interface AvatarDisplayProps {
  avatar: AvatarType;
  stage: AvatarStage;
  size?: "sm" | "md" | "lg";
  showAddFriend?: boolean;
  onAddFriend?: () => void;
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-base",
  md: "h-12 w-12 text-xl",
  lg: "h-20 w-20 text-3xl",
};

const stageBorders: Record<AvatarStage, string> = {
  0: "ring-2 ring-muted-foreground/30",
  1: "ring-2 ring-border",
  2: "ring-2 ring-primary/50",
  3: "ring-2 ring-prize shadow-sm",
};

export default function AvatarDisplay({ avatar, stage, size = "md", showAddFriend, onAddFriend, className }: AvatarDisplayProps) {
  const emoji = avatarEmojis[avatar]?.[stage] ?? "🐉";

  return (
    <div className="relative inline-flex">
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-muted",
          sizeClasses[size],
          stageBorders[stage],
          stage === 3 && "bg-prize/10",
          className
        )}
      >
        <span>{emoji}</span>
      </div>
      {showAddFriend && (
        <button
          onClick={onAddFriend}
          className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
        >
          <Plus className="h-3 w-3" strokeWidth={3} />
        </button>
      )}
    </div>
  );
}
