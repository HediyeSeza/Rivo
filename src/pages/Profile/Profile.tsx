import { useEffect, useState } from "react";

import ProfileCard from "../../components/Profile/ProfileCard/ProfileCard";
import ProfilePosts from "../../components/Profile/ProfilePosts/ProfilePosts";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import Loading from "../../components/loading/Loading";

import {
  getUserById,
  updateUserProfile,
} from "../../services/userApi";

import { useAuth } from "../../context/AuthContext";

import type {
  UpdateProfilePayload,
  User,
} from "../../services/userApi";

function Profile() {
  const { user: authUser, updateUser } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [postsCount, setPostsCount] = useState(0);

  const loadProfile = async (showLoading = false) => {
    if (!authUser?.id) {
      setIsLoading(false);
      return;
    }

    try {
      if (showLoading) {
        setIsLoading(true);
      }

      setError(null);

      const minimumLoadingTime = new Promise((resolve) => {
        window.setTimeout(resolve, 800);
      });

      const [profileUser] = await Promise.all([
        getUserById(authUser.id),
        minimumLoadingTime,
      ]);

      setUser(profileUser);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load profile.",
      );
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    void loadProfile(true);
  }, [authUser?.id]);

  useEffect(() => {
    const handleProfileChanged = () => {
      void loadProfile(false);
    };

    window.addEventListener(
      "posts:changed",
      handleProfileChanged,
    );

    window.addEventListener(
      "profile:changed",
      handleProfileChanged,
    );

    return () => {
      window.removeEventListener(
        "posts:changed",
        handleProfileChanged,
      );

      window.removeEventListener(
        "profile:changed",
        handleProfileChanged,
      );
    };
  }, [authUser?.id]);

  const handleSaveProfile = async (
    data: UpdateProfilePayload,
  ) => {
    if (!user) {
      return;
    }

    try {
      setIsSaving(true);
      setSaveError(null);

      const updatedUser = await updateUserProfile(
        user.id,
        data,
      );

      setUser(updatedUser);
      updateUser(updatedUser);
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error,
      );

      setSaveError(
        error instanceof Error
          ? error.message
          : "Failed to update profile.",
      );

      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <span className="text-[14px] text-red-500">
          {error}
        </span>
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
      <div
        className="
          grid
          w-full
          grid-cols-1
          gap-6
          lg:grid-cols-[230px_minmax(0,1fr)]
          xl:grid-cols-[294px_minmax(0,1fr)]
          2xl:grid-cols-[358px_minmax(0,1fr)]
          2xl:gap-8
        "
      >
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
                postsCount={postsCount}
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
              onPostsCountChange={setPostsCount}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;