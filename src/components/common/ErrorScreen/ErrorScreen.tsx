import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import "./ErrorScreen.css";

interface ErrorScreenProps {
  onRetry?: () => void;
}

const ErrorScreen = ({
  onRetry = () => window.location.reload(),
}: ErrorScreenProps) => {
  return (
    <div className="error-screen">
      <div className="error-screen__content">
        <h1 className="error-screen__title">Something went wrong</h1>

        <p className="error-screen__message">
          We couldn't load this page.
          <br />
          Please check your connection
          <br />
          and try again.
        </p>

        <Button
          type="button"
          variant="primary"
          onClick={onRetry}
          className="error-screen__button"
        >
          <Icon name="Refresh" size={20} className="error-screen__icon" />
          Try again
        </Button>
      </div>
    </div>
  );
};

export default ErrorScreen;
