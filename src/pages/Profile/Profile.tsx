import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "../../components/Profile/ProfileCard/ProfileCard";
import ProfilePosts from "../../components/Profile/ProfilePosts/ProfilePosts";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import { useAuth } from "../../context/AuthContext";
import { ApiError } from "../../services/api";
import { userApi } from "../../services/userApi";
import type { UpdateProfilePayload, User } from "../../types/user";

function resolveUserId(user: User | null | undefined): string | undefined {
  if (!user) return undefined;

  const record = user as User & { _id?: string | number };
  const raw = record.id ?? record._id;

  if (raw === undefined || raw === null || String(raw).trim() === "") {
    return undefined;
  }

  return String(raw);
}

function unwrapUser(payload: unknown): User {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid user response");
  }

  const record = payload as Record<string, unknown>;
  const candidate = (record.user ?? record.data ?? payload) as User & {
    _id?: string | number;
  };
  const id = resolveUserId(candidate);

  if (!id) {
    throw new Error("Invalid user response");
  }

  return {
    ...candidate,
    id,
  };
}

function Profile() {
  const { id } = useParams();
  const auth = useAuth();
  const currentUser = auth.user;
  const signIn = auth.signIn;

  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const profileId = id ?? resolveUserId(currentUser);
  const isOwnProfile = Boolean(
    currentUser &&
      profile &&
      String(resolveUserId(currentUser)) === String(resolveUserId(profile)),
  );

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileId) {
        setProfile(null);
        setError("You need to log in to view this profile.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await userApi.getUserById(profileId);
        setProfile(unwrapUser(response));
      } catch (err) {
        setProfile(null);
        setError(
          err instanceof ApiError ? err.message : "Failed to load profile.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProfile();
  }, [profileId]);

  const handleSaveProfile = async (data: UpdateProfilePayload) => {
  if (!profile || !isOwnProfile || !currentUser) return;

  const id = resolveUserId(profile) ?? resolveUserId(currentUser);
  if (!id) {
    setSaveError("Failed to update profile.");
    return;
  }

  setIsSaving(true);
  setSaveError(null);

  try {
    await userApi.updateProfile(id, {
      name: data.name,
      bio: data.bio,
      location: data.location,
      website: data.website,
    });

    const refreshed = await userApi.getUserById(id);
    const updatedUser = unwrapUser(refreshed);

    const nextProfile = {
      ...profile,
      ...updatedUser,
      ...data,
    };

    setProfile(nextProfile);
    signIn({
      ...currentUser,
      ...nextProfile,
    });
  } catch (err) {
    const message =
      err instanceof ApiError ? err.message : "Failed to update profile.";
    setSaveError(message);
    throw err;
  } finally {
    setIsSaving(false);
  }
};


  return (
    <div className="min-h-screen">
      <aside className="hidden pl-4 pt-24 lg:block">
        <ProfileSidebar />
      </aside>

      <main className="w-full px-4 pb-10 pt-24 lg:pl-80 lg:pt-0">
        <div className="mx-auto flex w-full max-w-[840px] flex-col items-center gap-4">
          <div className="w-full max-w-[524px]">
            {isLoading ? (
              <div className="rounded-2xl border border-[#E5E5E5] bg-white p-10 text-center text-[14px] dark:border-[#313131] dark:bg-[#191919]">
                Loading profile...
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-[#E5E5E5] bg-white p-10 text-center text-[14px] text-red-500 dark:border-[#313131] dark:bg-[#191919]">
                {error}
              </div>
            ) : profile ? (
              <ProfileCard
                user={profile}
                isOwnProfile={isOwnProfile}
                onSaveProfile={handleSaveProfile}
                isSaving={isSaving}
                saveError={saveError}
              />
            ) : null}
          </div>

          <div className="mt-6 w-full">
            <ProfilePosts isOwnProfile={isOwnProfile} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
