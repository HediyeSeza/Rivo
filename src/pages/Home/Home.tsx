import Feed from "../../components/Home/Feed/Feed";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import RecommendedUsers from "../../components/RecommendedUsers/RecommendedUsers";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen w-full pt-24">
      {/* Central Layout */}
      <div
        className="
          relative
          mx-auto
          flex
          w-full
          items-start
          justify-center
          gap-6
          px-4
          sm:px-6
          2xl:gap-8
        "
      >
        {/* Left Sidebar */}
        <aside
          className="
            sticky
            w-[230px]
            xl:w-[294px]
            2xl:w-[358px]
            top-24
            hidden
            shrink-0
            lg:block
          "
        >
          {isAuthenticated ? <ProfileSidebar /> : <WelcomeSection />}
        </aside>

        {/* Main */}
        <main
          className="
            min-w-0
            flex-1
            max-w-[742px]
            overflow-y-auto
            pb-10
          "
        >
          <Feed />
        </main>

        {/* Right Sidebar */}
        <aside
          className="
            sticky
            w-[230px]
            xl:w-[294px]
            2xl:w-[358px]
            top-24
            hidden
            shrink-0
            lg:block
          "
        >
          <RecommendedUsers />
        </aside>
      </div>
    </div>
  );
};

export default Home;
