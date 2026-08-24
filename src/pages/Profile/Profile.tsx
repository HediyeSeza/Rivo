import ProfileCard from "../../components/Profile/ProfileCard/ProfileCard";
import ProfilePosts from "../../components/Profile/ProfilePosts/ProfilePosts";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";

function Profile() {
  const isOwnProfile = true;

  return (
    <main
      className="
        mx-auto
        w-full
        px-6
        pt-24
        pb-10
        sm:px-8
        lg:px-10
        xl:px-12
      "
    >
      <div
        className="
          grid
          w-full
          grid-cols-1
          gap-8
          xl:grid-cols-[360px_minmax(0,1fr)]
          2xl:grid-cols-[400px_minmax(0,1fr)]
        "
      >
        {/* Left Sidebar */}
        <aside className="hidden min-w-0 xl:block">
          <ProfileSidebar />
        </aside>

        {/* Right Content */}
        <section className="min-w-0 w-full">
          {/* Profile Card */}
          <div className="flex w-full justify-center">
            <div
              className="
                w-full
                max-w-[620px]
              "
            >
              <ProfileCard />
            </div>
          </div>

          {/* Posts / Likes */}
          <div className="mt-10 w-full">
            <ProfilePosts isOwnProfile={isOwnProfile} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;