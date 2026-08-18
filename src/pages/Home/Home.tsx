import Feed from "../../components/Home/Feed/Feed";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import RecommendedUsers from "../../components/RecommendedUsers/RecommendedUsers";

const Home = () => {
  const isAuthenticated = false;

  return (
    <main
      className="
        mx-auto
        grid
        w-full
        grid-cols-1
        gap-0
        px-4
        pt-24
        md:px-5
        lg:grid-cols-[360px_minmax(0,1fr)_360px]
      "
    >
      {/* Left Sidebar */}
      <aside className="hidden lg:block">
        {!isAuthenticated && <WelcomeSection />}
      </aside>

      {/* Main Feed */}
      <section className="min-w-0 w-full">
        {!isAuthenticated && <Feed />}
      </section>

      {/* Right Sidebar */}
      <aside className="hidden lg:block">
        <RecommendedUsers />
      </aside>
    </main>
  );
};

export default Home;
