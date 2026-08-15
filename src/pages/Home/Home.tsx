import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import RecommendedUsers from "../../components/RecommendedUsers/RecommendedUsers";

import CreatePost from "../../components/Home/CreatePost/CreatePost";
import Feed from "../../components/Home/Feed/Feed";
import GuestWelcome from "../../components/Home/GuestWelcome/GuestWelcome";

const Home = () => {
  // فعلاً برای فاز UI
  // بعداً از Auth واقعی میاد
  const isAuthenticated = true;

  return (
    <main className="mx-auto grid w-full grid-cols-1 gap-7 px-4 pt-24 md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)_380px]">
      {/* Left Sidebar */}
      <aside className="hidden md:block">
        {isAuthenticated ? <ProfileSidebar /> : <GuestWelcome />}
      </aside>

      {/* Main */}
      <section className="min-w-0">
        {isAuthenticated ? <CreatePost /> : <GuestWelcome />}

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