import Icon from "../Icon/Icon";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

const Avatar = ({
  src,
  alt = "User avatar",
  size = 40,
  className = "",
}: AvatarProps) => {
  return (
    <div
      className={`
        shrink-0
        overflow-hidden
        rounded-full
        border
        border-[var(--color-border)]
        bg-[var(--color-bg)]
        text-[var(--color-content-secondary)]
        ${className}
      `}
      style={{
        width: size,
        height: size,
      }}
    >
      {src ? (
        <img
          src={src}
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