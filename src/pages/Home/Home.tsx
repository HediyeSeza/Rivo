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
        grid
        w-full
        grid-cols-1
        gap-0
        px-4
        pt-24
        md:px-5
        lg:grid-cols-[minmax(300px,360px)_minmax(0,1fr)_minmax(300px,350px)]
        lg:gap-6
      "
    >
      {/* Left Sidebar */}
      <aside className="hidden lg:block">
        {isAuthenticated ? <ProfileSidebar /> : <WelcomeSection />}
      </aside>

      {/* Main Feed */}
      <section className="min-w-0 w-full">
        <Feed />
      </section>

      {/* Right Sidebar */}
      <aside className="hidden lg:block">
        <RecommendedUsers />
      </aside>
    </main>
  );
};

export default Home;