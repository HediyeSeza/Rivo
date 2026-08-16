import ProfileCard from "../../components/Profile/ProfileCard/ProfileCard";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";

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
        </div>
      </main>
    </div>
  );
}

export default Profile;
