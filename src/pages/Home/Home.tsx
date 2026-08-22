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
        min-h-screen
        w-full
        max-w-[1400px]
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
      <aside className="hidden min-w-0 xl:block">
        {isAuthenticated ? <ProfileSidebar /> : <WelcomeSection />}
      </aside>

      {/* Main Feed */}
      <section className="min-w-0 w-full">
        <Feed />
      </section>

      {/* Right Sidebar */}
      <aside className="hidden min-w-0 xl:block">
        <RecommendedUsers />
      </aside>
    </main>
  );
};

export default Home;