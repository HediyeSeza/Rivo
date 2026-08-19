import ProfileCard from "../../components/Profile/ProfileCard/ProfileCard";
import ProfilePosts from "../../components/Profile/ProfilePosts/ProfilePosts";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";

function Profile() {
  const isOwnProfile = true;

  return (
    <div className="min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden pl-4 pt-24 lg:block">
        <ProfileSidebar />
      </aside>

      {/* Main Content */}
      <main className="w-full px-4 pb-10 lg:pl-80  pt-24 lg:pt-0">
        <div className="mx-auto flex w-full max-w-[840px] flex-col gap-4 items-center">
          <div className="w-full max-w-[524px]">
            <ProfileCard />
          </div>

          {/* Posts / Likes */}
          <div className="mt-6 w-full">
            <ProfilePosts isOwnProfile={isOwnProfile} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
