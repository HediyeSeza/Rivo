import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import NotificationsList from "../../components/Notifications/NotificationsList/NotificationsList";

const Notifications = () => {
  return (
    <main
      className="
        mx-auto
        grid
        w-full
        grid-cols-1
        gap-7
        px-4
        pt-24
        md:grid-cols-[280px_minmax(0,1fr)]
      "
    >
      {/* Left Sidebar */}
      <aside className="hidden md:block">
        <ProfileSidebar />
      </aside>

      {/* Notifications */}
      <section
        className="
          min-w-0
          rounded-xl
          border
          border-[var(--color-border)]
          bg-[var(--color-card)]
          p-6
          text-[var(--color-content-primary)]
          shadow-[0_2px_8px_rgba(0,0,0,0.08)]
          transition-colors
          duration-200
          dark:shadow-[0_2px_8px_rgba(0,0,0,0.25)]
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[16px] font-bold">
            Notifications
          </h1>

          <div className="flex items-center gap-5">
            <span
              className="
                text-[14px]
                text-[var(--color-content-secondary)]
              "
            >
              3 unread
            </span>

            <button
              type="button"
              className="
                cursor-pointer
                text-[14px]
                font-medium
                text-[var(--color-content-primary)]
                transition-opacity
                duration-200
                hover:opacity-70
              "
            >
              Mark as read
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="mt-6">
          <NotificationsList />
        </div>
      </section>
    </main>
  );
};

export default Notifications;