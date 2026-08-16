import ProfileCard from "../../components/Profile/ProfileCard/ProfileCard";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import ProfilePosts from "../../components/Profile/ProfilePosts/ProfilePosts";

function Profile() {
  return (
    <div>
      <aside className="pl-4 pt-24">
        <ProfileSidebar />
      </aside>
      <main className="w-full">
        <div className="mx-auto flex flex-col gap-8 px-4">
          <div className="flex justify-center pl-80">
            <ProfileCard />
          </div>
          {/* Posts / Likes */}
          <div className="mx-auto w-full max-w-[1660px]  pl-96">
            <ProfilePosts />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
