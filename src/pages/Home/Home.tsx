import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import RecommendedUsers from "../../components/RecommendedUsers/RecommendedUsers";

const Home = () => {
  return (
    <main className="mx-auto grid w-full grid-cols-1 gap-7 px-4 pt-24 md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)_380px]">
      {/* Left Sidebar */}
      <aside className="hidden md:block">
        <ProfileSidebar />
      </aside>

      {/* Main */}
      <section>{/* Posts / Create Post */}</section>

      {/* Right Sidebar */}
      <aside className="hidden lg:block">
        <RecommendedUsers />
      </aside>
    </main>
  );
};

export default Home;
