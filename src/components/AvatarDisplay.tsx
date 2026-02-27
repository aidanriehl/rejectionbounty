import { cn } from "@/lib/utils";
import { avatarEmojis, type AvatarType, type AvatarStage } from "@/lib/mock-data";
import { Plus, Camera } from "lucide-react";

interface AvatarDisplayProps {
  avatar: AvatarType;
  stage: AvatarStage;
  size?: "sm" | "md" | "lg";
  photoUrl?: string | null;
  showAddFriend?: boolean;
  onAddFriend?: () => void;
  showEditOverlay?: boolean;
  onEditPhoto?: () => void;
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-base",
  md: "h-12 w-12 text-xl",
  lg: "h-20 w-20 text-3xl",
};

const ringClasses = {
  sm: "ring-[1.5px]",
  md: "ring-2",
  lg: "ring-[2.5px]",
};

export default function AvatarDisplay({
  avatar,
  stage,
  size = "md",
  photoUrl,
  showAddFriend,
  onAddFriend,
  showEditOverlay,
  onEditPhoto,
  className,
}: AvatarDisplayProps) {
  const emoji = avatarEmojis[avatar]?.[stage] ?? "🐉";

  return (
    <div className="relative inline-flex">
      <div
        className={cn(
          "flex items-center justify-center rounded-full overflow-hidden bg-muted",
          sizeClasses[size],
          ringClasses[size],
          "ring-border",
          className
        )}
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{emoji}</span>
        )}
      </div>

      {showEditOverlay && (
        <button
          onClick={onEditPhoto}
          className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white transition-opacity"
        >
          <Camera className="h-5 w-5" />
        </button>
      )}

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
