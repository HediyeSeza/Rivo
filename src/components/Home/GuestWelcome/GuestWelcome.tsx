import Button from "../../common/Button/Button";
import Icon from "../../common/Icon/Icon";

const GuestWelcome = () => {
  return (
    <section
      className="
        w-full
        rounded-2xl
        border border-[var(--color-border)]
        bg-[var(--color-card)]
        p-5
        text-[var(--color-content-primary)]
        transition-colors duration-200
      "
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full
              border border-[var(--color-border)]
            "
          >
            <Icon name="Person" size={20} />
          </div>

          <div>
            <h2 className="text-[20px] font-bold">
              Welcome Back!
            </h2>

            <p className="mt-1 text-[14px] text-[var(--color-content-secondary)]">
              Sign in to connect with your community.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            className="w-full sm:w-auto"
            variant="primary"
          >
            <span className="text-[14px] font-normal">
              Sign in
            </span>
          </Button>

          <Button
            className="w-full sm:w-auto"
            variant="secondary"
          >
            <span className="text-[14px] font-normal">
              Sign up
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GuestWelcome;