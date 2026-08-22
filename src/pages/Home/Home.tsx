import Feed from "../../components/Home/Feed/Feed";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import RecommendedUsers from "../../components/RecommendedUsers/RecommendedUsers";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <main
      className="
        mx-auto
        h-screen
        w-full
        overflow-hidden
        px-4
        pt-24
        pb-10

        sm:px-6

        xl:grid
        xl:grid-cols-[250px_minmax(0,1fr)_250px]
        xl:items-start
        xl:gap-6

        2xl:px-8
        2xl:gap-8
      "
    >
      {/* Left Sidebar */}
      <aside className="hidden min-h-0 lg:block">
        <div className="sticky top-24">
          {isAuthenticated ? <ProfileSidebar /> : <WelcomeSection />}
        </div>
      </aside>

      {/* Main Feed */}
      <section
        className="
          min-w-0
          h-full
          overflow-y-auto
          scrollbar-hide
        "
      >
        <Feed />
      </section>

      {/* Right Sidebar */}
      <aside className="hidden min-h-0 lg:block">
        <div className="sticky top-24">
          <RecommendedUsers />
        </div>
      </aside>
    </main>
  );
};

export default Home;
