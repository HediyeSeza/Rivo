import { useEffect } from "react";
import { getUserById } from "../../services/userApi";

import Feed from "../../components/Home/Feed/Feed";

import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";

import RecommendedUsers from "../../components/RecommendedUsers/RecommendedUsers";

import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";

import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const {
    user,
    isAuthenticated,
    updateUser
  } = useAuth();
  useEffect(() => {
  if (!user?.id) {
    return;
  }

  let cancelled = false;

  getUserById(user.id)
    .then((freshUser) => {
      if (!cancelled) {
        updateUser(freshUser);
      }
    })
    .catch(() => {});

  return () => {
    cancelled = true;
  };
}, [user?.id]);

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
            top-24
            hidden
            w-[230px]
            shrink-0
            lg:block
            xl:w-[294px]
            2xl:w-[358px]
          "
        >
          {isAuthenticated ? (
            <ProfileSidebar user={user} />
          ) : (
            <WelcomeSection />
          )}
        </aside>

        {/* Main Feed */}
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
            top-24
            hidden
            w-[230px]
            shrink-0
            lg:block
            xl:w-[294px]
            2xl:w-[358px]
          "
        >
          <RecommendedUsers />
        </aside>
      </div>
    </div>
  );
};

export default Home;