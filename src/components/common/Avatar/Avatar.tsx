import Icon from "../Icon/Icon";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

const CDN_BASE = "https://1p5nep1spk.ucarecd.net";

const UUID_PATTERN =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

const resolveAvatarSrc = (src?: string) => {
  if (!src) return undefined;

  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("blob:") ||
    src.startsWith("data:") ||
    src.startsWith("/")
  ) {
    return src;
  }

  const uuid = src.trim().match(UUID_PATTERN)?.[0];
  if (uuid) {
    return `${CDN_BASE}/${uuid}/`;
  }

  return src;
};

const Avatar = ({
  src,
  alt = "User avatar",
  size = 40,
  className = "",
}: AvatarProps) => {
  const resolvedSrc = resolveAvatarSrc(src);

  return (
    <div
      className={`shrink-0 overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-content-secondary)] ${className}`}
      style={{ width: size, height: size }}
    >
      {resolvedSrc ? (
        <img
          src={resolvedSrc}
          alt={alt}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Icon name="Person" size={size * 0.5} alt="" />
        </div>
      )}
    </div>
  );
};

export default Avatar;
