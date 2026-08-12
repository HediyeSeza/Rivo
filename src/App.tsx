import Button from "./components/common/Button/Button";
import Icon from "./components/common/Icon/Icon";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <Button
            variant="primary"
            size="large"
            icon={<Icon name="Moon" size={20} />}
          >
            Sign Up
          </Button>

          <Button
            variant="secondary"
            size="large"
            icon={<Icon name="Moon" size={20} />}
          >
            Sign Up
          </Button>

          <Button
            variant="tertiary"
            size="large"
            icon={<Icon name="Moon" size={20} />}
          >
            Sign Up
          </Button>

          <Button
            variant="pure"
            size="large"
            icon={<Icon name="Moon" size={20} />}
          >
            Sign Up
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <Button
            variant="primary"
            size="small"
            icon={<Icon name="Moon" size={18} />}
          >
            Sign Up
          </Button>

          <Button
            variant="secondary"
            size="small"
            icon={<Icon name="Moon" size={18} />}
          >
            Sign Up
          </Button>

          <Button
            variant="tertiary"
            size="small"
            icon={<Icon name="Moon" size={18} />}
          >
            Sign Up
          </Button>

          <Button
            variant="pure"
            size="small"
            icon={<Icon name="Moon" size={18} />}
          >
            Sign Up
          </Button>
        </div>

        <Button
          variant="primary"
          size="large"
          disabled
          icon={<Icon name="Moon" size={20} />}
        >
          Sign Up
        </Button>
      </div>
    </>
  );
}

export default App;
