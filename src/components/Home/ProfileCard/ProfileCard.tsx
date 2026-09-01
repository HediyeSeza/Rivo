import Avatar from "../../common/Avatar/Avatar";

const ProfileCard = () => {
  return (
    <section
      className="
        w-full
        rounded-2xl
        border border-[var(--color-border)]
        bg-[var(--color-card)]
        p-4
        text-[var(--color-content-primary)]
        transition-colors duration-200
      "
    >
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center">
        <Avatar src="" alt="Profile avatar" />

        <h2 className="mt-3 text-[16px] font-bold">Hediye</h2>

        <p className="mt-1 text-[14px] text-[var(--color-content-secondary)]">
          @hediye
        </p>
      </div>

      {/* Bio */}
      <p
        className="
          mt-4
          text-center
          text-[14px]
          leading-6
          text-[var(--color-content-secondary)]
        "
      >
        Building ideas, learning new things and sharing the journey.
      </p>

      {/* Stats */}
      <div
        className="
          mt-5
          grid grid-cols-2
          border-y border-[var(--color-border)]
          py-3
        "
      >
        <div className="text-center">
          <p className="text-[16px] font-bold">120</p>

          <p className="mt-1 text-[14px] text-[var(--color-content-secondary)]">
            Followers
          </p>
        </div>

        <div
          className="
            border-l border-[var(--color-border)]
            text-center
          "
        >
          <p className="text-[16px] font-bold">86</p>

          <p className="mt-1 text-[14px] text-[var(--color-content-secondary)]">
            Following
          </p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Avatar src="" alt="" />

          <span className="text-[14px] text-[var(--color-content-secondary)]">
            Tehran, Iran
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
