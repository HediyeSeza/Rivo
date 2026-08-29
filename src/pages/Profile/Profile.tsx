import { useEffect, useState } from "react";

import ProfileCard from "../../components/Profile/ProfileCard/ProfileCard";
import ProfilePosts from "../../components/Profile/ProfilePosts/ProfilePosts";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";

import { useAuth } from "../../context/AuthContext";

import { getUserById, updateUserProfile } from "../../services/userApi";

import type { UpdateProfilePayload, User } from "../../services/userApi";

function Profile() {
  const { user: authUser, updateUser } = useAuth();

  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!authUser?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const profileUser = await getUserById(authUser.id);
        setUser(profileUser);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load profile.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadProfile();
  }, [authUser?.id]);

  const handleSaveProfile = async (data: UpdateProfilePayload) => {
    if (!user) {
      return;
    }

    try {
      setIsSaving(true);
      setSaveError(null);

      const updatedUser = await updateUserProfile(user.id, data);

      setUser(updatedUser);
      updateUser(updatedUser);
    } catch (error) {
      console.error("Failed to update profile:", error);

      setSaveError(
        error instanceof Error ? error.message : "Failed to update profile.",
      );

      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <span className="text-[14px] text-(--color-content-secondary)">
          Loading profile...
        </span>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <span className="text-[14px] text-red-500">{error}</span>
      </main>
    );
  }

  if (!user) {
    return null;
  }

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
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[294px_minmax(0,1fr)] 2xl:grid-cols-[358px_minmax(0,1fr)] 2xl:gap-8">
        {/* Left Sidebar */}
        <aside className="sticky top-24 hidden min-w-0 lg:block">
          <ProfileSidebar user={user} />
        </aside>

        {/* Profile Content */}
        <section className="min-w-0 w-full">
          <div className="flex w-full justify-center">
            <div className="w-full max-w-[550px]">
              <ProfileCard
                user={user}
                onSaveProfile={handleSaveProfile}
                isSaving={isSaving}
                saveError={saveError}
              />
            </div>
          </div>

          <div className="mt-6 w-full">
            <ProfilePosts
              userId={user.id}
              isOwnProfile={true}
              profileImage={user.image}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;
