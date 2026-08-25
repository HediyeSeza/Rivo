import { useEffect, useState } from "react";

import PostCard from "../../Home/PostCard/PostCard";
import SuccessModal from "../../common/Modal/SuccessModal";

import {
  getUserLikedPosts,
  getUserPosts,
} from "../../../services/userApi";

import type { User } from "../../../types/user";

type ProfileTab = "posts" | "likes";

interface ProfilePostsProps {
  isOwnProfile: boolean;
  userId: string;
  user: User;
}

interface ProfilePost {
  id: number;
  name: string;
  username: string;
  createdAt: string;
  content: string;
  likes: number;
  comments: number;
}

const ProfilePosts = ({
  isOwnProfile,
  userId,
  user,
}: ProfilePostsProps) => {
  const [activeTab, setActiveTab] =
    useState<ProfileTab>("posts");

  const [posts, setPosts] = useState<ProfilePost[]>([]);
  const [likedPosts, setLikedPosts] =
    useState<ProfilePost[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] =
    useState<string | null>(null);

  const [postToDelete, setPostToDelete] =
    useState<number | null>(null);

  const [showSuccess, setShowSuccess] =
    useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const [data, likedData] = await Promise.all([
          getUserPosts(userId),
          getUserLikedPosts(userId),
        ]);

        const mappedPosts: ProfilePost[] = data.map(
          (post) => ({
            id: Number(post.id),
            name: user.name,
            username: user.username ?? "",
            createdAt: post.createdAt,
            content: post.content,
            likes: 0,
            comments: 0,
          }),
        );

        const mappedLikedPosts: ProfilePost[] =
          likedData.map((post) => ({
            id: Number(post.id),
            name: user.name,
            username: user.username ?? "",
            createdAt: post.createdAt,
            content: post.content,
            likes: 0,
            comments: 0,
          }));

        setPosts(mappedPosts);
        setLikedPosts(mappedLikedPosts);
      } catch (error) {
        console.error(
          "Failed to fetch user posts:",
          error,
        );

        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [userId, user]);

  const displayedPosts =
    activeTab === "posts" ? posts : likedPosts;

  const handleDeletePost = () => {
    if (postToDelete === null) return;
    if (!isOwnProfile) return;

    setPosts((currentPosts) =>
      currentPosts.filter(
        (post) => post.id !== postToDelete,
      ),
    );

    setPostToDelete(null);
    setShowSuccess(true);

    window.setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const handleRemoveLike = (postId: number) => {
    if (!isOwnProfile) return;

    setLikedPosts((currentPosts) =>
      currentPosts.filter(
        (post) => post.id !== postId,
      ),
    );
  };

  return (
    <section className="w-full">
      {/* Success Modal */}
      {showSuccess && (
        <SuccessModal message="Post deleted successfully" />
      )}

      {/* Confirm Delete Modal */}
    

      {/* Tabs */}
      <div
        className="
          flex
          w-full
          items-center
          rounded-xl
          bg-(--color-tab-bg)
          p-1
        "
      >
        {/* Posts */}
        <button
          type="button"
          onClick={() => setActiveTab("posts")}
          aria-pressed={activeTab === "posts"}
          className={`
            flex
            min-h-[36px]
            flex-1
            items-center
            justify-center
            rounded-lg
            border
            px-4
            text-[16px]
            font-medium
            transition-all
            duration-200

            ${
              activeTab === "posts"
                ? `
                  border-(--color-tab-active-border)
                  bg-(--color-tab-active-bg)
                  text-(--color-content-primary)
                  shadow-sm
                `
                : `
                  border-transparent
                  bg-transparent
                  text-(--color-content-secondary)
                `
            }
          `}
        >
          Posts
        </button>

        {/* Likes */}
        <button
          type="button"
          onClick={() => setActiveTab("likes")}
          aria-pressed={activeTab === "likes"}
          className={`
            flex
            min-h-[36px]
            flex-1
            items-center
            justify-center
            rounded-lg
            border
            px-4
            text-[16px]
            font-medium
            transition-all
            duration-200

            ${
              activeTab === "likes"
                ? `
                  border-(--color-tab-active-border)
                  bg-(--color-tab-active-bg)
                  text-(--color-content-primary)
                  shadow-sm
                `
                : `
                  border-transparent
                  bg-transparent
                  text-(--color-content-secondary)
                `
            }
          `}
        >
          Likes
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div
          className="
            mt-5
            flex
            min-h-[180px]
            w-full
            items-center
            justify-center
            rounded-xl
            border
            border-(--color-border)
            bg-(--color-card)
            px-5
            text-center
            text-[14px]
            text-(--color-content-secondary)
          "
        >
          Loading...
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div
          className="
            mt-5
            flex
            min-h-[180px]
            w-full
            items-center
            justify-center
            rounded-xl
            border
            border-(--color-border)
            bg-(--color-card)
            px-5
            text-center
            text-[14px]
            text-red-500
          "
        >
          {error}
        </div>
      )}

      {/* Posts */}
      {!loading && !error && (
        <div className="mt-5 flex w-full flex-col gap-4">
          {displayedPosts.length > 0 ? (
            displayedPosts.map((post) => (
              <PostCard
                key={post.id}
                name={post.name}
                username={post.username}
                createdAt={post.createdAt}
                content={post.content}
                likes={post.likes}
                comments={post.comments}
                showDelete={
                  activeTab === "posts" &&
                  isOwnProfile
                }
                onDelete={() =>
                  setPostToDelete(post.id)
                }
                isLiked={activeTab === "likes"}
                showUnlike={
                  activeTab === "likes" &&
                  isOwnProfile
                }
                onUnlike={() =>
                  handleRemoveLike(post.id)
                }
              />
            ))
          ) : (
            <div
              className="
                flex
                min-h-[180px]
                w-full
                items-center
                justify-center
                rounded-xl
                border
                border-(--color-border)
                bg-(--color-card)
                px-5
                text-center
                text-[14px]
                text-(--color-content-secondary)
              "
            >
              {activeTab === "posts"
                ? "No posts yet."
                : "No liked posts yet."}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ProfilePosts;