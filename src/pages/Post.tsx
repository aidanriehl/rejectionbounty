import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X, Upload, Image, Film } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function PostPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const challengeTitle = (location.state as any)?.challengeTitle || "Challenge";
  const [caption, setCaption] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [selectedThumb, setSelectedThumb] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  // Mock thumbnail frames (in real app these would be extracted from the video)
  const thumbFrames = videoFile
    ? [0, 1, 2].map((i) => URL.createObjectURL(videoFile))
    : [];

  const handlePost = () => {
    toast({ title: "Posted to feed!" });
    navigate("/challenges");
  };

  return (
    <div className="min-h-screen pb-24 pt-4">
      <div className="mx-auto max-w-lg px-4">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Post to Feed</h1>
          <button
            onClick={() => navigate("/challenges")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Challenge name */}
        <p className="mb-4 text-sm font-medium text-foreground">{challengeTitle}</p>

        {/* Video upload */}
        <input
          ref={fileRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
        />
        <button
          onClick={() => fileRef.current?.click()}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 py-10 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
        >
          {videoFile ? (
            <>
              <Film className="h-5 w-5" />
              <span className="font-medium">{videoFile.name}</span>
            </>
          ) : (
            <>
              <Upload className="h-5 w-5" />
              <span>Select video (max 30s)</span>
            </>
          )}
        </button>

        {/* Thumbnail picker — only show when video is selected */}
        {videoFile && (
          <div className="mb-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Image className="h-3.5 w-3.5" />
              Choose thumbnail from video
            </p>
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setSelectedThumb(i)}
                  className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 transition-all ${
                    selectedThumb === i
                      ? "border-primary ring-1 ring-primary"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                    {i === 0 ? "0:00" : i === 1 ? "0:15" : "0:30"}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Caption */}
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Add a caption (optional)"
          rows={3}
          className="mb-6 w-full resize-none rounded-xl border bg-muted/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />

        {/* Post button */}
        <button
          onClick={handlePost}
          className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Post to Feed
        </button>

        {/* Skip */}
        <button
          onClick={() => navigate("/challenges")}
          className="mt-2 w-full py-2 text-sm text-muted-foreground hover:text-foreground"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
