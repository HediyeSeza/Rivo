import { useEffect, useMemo, useRef, useState } from "react";

const CDN_BASE = "https://79gcelddzk.ucarecd.net";

const AVATAR_COLORS = [
  "#E17076",
  "#7BC862",
  "#E5CA77",
  "#65AADD",
  "#A695E7",
  "#EE7AAE",
];

interface ProfilePhotoProps {
  image?: string | null;
  name: string;
  editable?: boolean;
  onFileSelect?: (file: File) => void;
  onDelete?: () => void;
}

function resolveAvatarUrl(image?: string | null) {
  if (!image) {
    return undefined;
  }

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("blob:") ||
    image.startsWith("data:")
  ) {
    return image;
  }

  const uuid = image.match(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
  )?.[0];

  if (!uuid) {
    return image;
  }

  return `${CDN_BASE}/${uuid}/`;
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "U";
}

function getAvatarColor(name: string) {
  let hash = 0;

  for (let index = 0; index < name.length; index += 1) {
    hash = name.charCodeAt(index) + ((hash << 5) - hash);
  }

  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const ProfilePhoto = ({
  image,
  name,
  editable = false,
  onFileSelect,
  onDelete,
}: ProfilePhotoProps) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const avatarUrl = useMemo(() => resolveAvatarUrl(image), [image]);
  const hasPhoto = Boolean(avatarUrl);
  const initial = getInitial(name);
  const fallbackColor = getAvatarColor(name);

  const isMobile = useMemo(() => {
    if (typeof navigator === "undefined") {
      return false;
    }

    return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  }, []);

  useEffect(() => {
    if (!isViewerOpen && !isSheetOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSheetOpen(false);
        setIsViewerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isViewerOpen, isSheetOpen]);

  const openSheet = () => {
    if (!editable) {
      return;
    }

    setIsSheetOpen(true);
  };

  const handleAvatarClick = () => {
    if (hasPhoto) {
      setIsViewerOpen(true);
      return;
    }

    openSheet();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    setIsSheetOpen(false);
    setIsViewerOpen(false);
    onFileSelect?.(file);
  };

  const handleDownload = async () => {
    if (!avatarUrl) {
      return;
    }

    try {
      const response = await fetch(avatarUrl);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = `${name || "avatar"}.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      window.open(avatarUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={handleAvatarClick}
        aria-label={hasPhoto ? "View profile photo" : "Add profile photo"}
        className="group relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-(--color-border) transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-content-primary) sm:h-28 sm:w-28"
      >
        {hasPhoto ? (
          <img
            src={avatarUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            className="flex h-full w-full items-center justify-center text-[32px] font-semibold text-white sm:text-[36px]"
            style={{ backgroundColor: fallbackColor }}
          >
            {initial}
          </span>
        )}

        {editable && (
          <span className="pointer-events-none absolute inset-0 flex items-end justify-center bg-black/0 pb-2 text-[11px] font-medium text-white opacity-0 transition-all duration-200 group-hover:bg-black/35 group-hover:opacity-100">
            {hasPhoto ? "View" : "Add"}
          </span>
        )}
      </button>

      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={handleFileChange}
      />

      {isViewerOpen && hasPhoto && (
        <div
          className="fixed inset-0 z-80 flex flex-col bg-black/80 backdrop-blur-sm"
          role="presentation"
          onClick={() => setIsViewerOpen(false)}
        >
          <div className="flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))]">
            <p className="truncate text-[15px] font-medium text-white">
              {name}
            </p>
            <button
              type="button"
              onClick={() => setIsViewerOpen(false)}
              className="rounded-full px-3 py-1 text-[14px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center px-4 py-6">
            <img
              src={avatarUrl}
              alt={name}
              className="max-h-[70vh] w-full max-w-[520px] rounded-2xl object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </div>

          <div
            className="mx-auto mb-[max(1rem,env(safe-area-inset-bottom))] flex w-full max-w-[520px] items-center justify-center gap-2 px-4"
            onClick={(event) => event.stopPropagation()}
          >
            {editable && (
              <button
                type="button"
                onClick={openSheet}
                className="rounded-full bg-white/10 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/20"
              >
                Change
              </button>
            )}

            <button
              type="button"
              onClick={handleDownload}
              className="rounded-full bg-white/10 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/20"
            >
              Download
            </button>

            {editable && onDelete && (
              <button
                type="button"
                onClick={() => {
                  setIsViewerOpen(false);
                  onDelete();
                }}
                className="rounded-full bg-red-600/90 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-red-600"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}

      {isSheetOpen && editable && (
        <div
          className="fixed inset-0 z-90 flex items-end justify-center bg-black/40 p-3 sm:items-center"
          role="presentation"
          onClick={() => setIsSheetOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="photo-sheet-title"
            className="w-full max-w-md rounded-2xl border border-(--color-border) bg-(--color-card) p-3 shadow-xl sm:p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-(--color-border) sm:hidden" />

            <h2
              id="photo-sheet-title"
              className="px-2 pb-2 text-[15px] font-semibold text-(--color-content-primary)"
            >
              Profile photo
            </h2>

            {isMobile && (
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[15px] text-(--color-content-primary) transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 dark:bg-white/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M4 8.5A2.5 2.5 0 0 1 6.5 6H8l1.2-1.8A1.5 1.5 0 0 1 10.4 3.5h3.2a1.5 1.5 0 0 1 1.2.7L16 6h1.5A2.5 2.5 0 0 1 20 8.5v9A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-9Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                </span>
                Take photo
              </button>
            )}

            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[15px] text-(--color-content-primary) transition-colors hover:bg-black/5 dark:hover:bg-white/5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 dark:bg-white/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect
                    x="3.5"
                    y="5"
                    width="17"
                    height="14"
                    rx="2.2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="m3.8 16.5 4.4-4.2a1.4 1.4 0 0 1 1.9 0l2.1 2 2.7-2.6a1.4 1.4 0 0 1 1.9 0l3.4 3.3"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <circle cx="9" cy="9.2" r="1.3" fill="currentColor" />
                </svg>
              </span>
              Choose photo
            </button>

            {hasPhoto && onDelete && (
              <button
                type="button"
                onClick={() => {
                  setIsSheetOpen(false);
                  onDelete();
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[15px] text-red-500 transition-colors hover:bg-red-500/10"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 7h14M10 11v6M14 11v6M8.5 7l.6-2.2A1.5 1.5 0 0 1 10.5 3.8h3a1.5 1.5 0 0 1 1.4 1L15.5 7M7 7l.8 12.1A1.5 1.5 0 0 0 9.3 20.5h5.4a1.5 1.5 0 0 0 1.5-1.4L17 7"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                Delete photo
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsSheetOpen(false)}
              className="mt-1 w-full rounded-xl px-3 py-3 text-[15px] text-(--color-content-secondary) transition-colors hover:bg-black/5 dark:hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePhoto;
