import { useEffect, useState } from "react";

import PostCard from "../../Home/PostCard/PostCard";
import SuccessModal from "../../common/Modal/SuccessModal";
import ConfirmModal from "../../common/Modal/ConfirmModal";

import { deletePost } from "../../../services/postApi";

import {
  getUserLikedPosts,
  getUserPosts,
  type ProfilePost,
} from "../../../services/userApi";

import { getUsernameFromEmail } from "../../../utils/getUsernameFromEmail";

type ProfileTab = "posts" | "likes";

interface ProfilePostsProps {
  userId: string;
  isOwnProfile: boolean;
  profileImage?: string | null;
  onPostsCountChange?: (count: number) => void;
}

type ProfilePostWithRelations = ProfilePost & {
  author?: {
    id?: string;
    name?: string;
    email?: string;
    image?: string | null;
  };
  post?: {
    author?: {
      id?: string;
      name?: string;
      email?: string;
      image?: string | null;
    };
  };
  _count?: {
    likes?: number;
    comments?: number;
  };
  likes?: unknown[];
  comments?: unknown[];
};

const ProfilePosts = ({
  userId,
  isOwnProfile = false,
  profileImage,
  onPostsCountChange,
}: ProfilePostsProps) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");

  const [posts, setPosts] = useState<ProfilePost[]>([]);

  const [likedPosts, setLikedPosts] = useState<ProfilePost[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [postToDelete, setPostToDelete] = useState<ProfilePost | null>(null);

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const loadProfilePosts = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const userPosts = await getUserPosts(userId);

        setPosts(userPosts);
        onPostsCountChange?.(userPosts.length);

        const liked = await getUserLikedPosts(userId);

        setLikedPosts(liked);
      } catch (error) {
        console.error("Failed to load profile posts:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load profile posts.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadProfilePosts();
  }, [userId]);

  const displayedPosts = activeTab === "posts" ? posts : likedPosts;

  const handleDeletePost = async () => {
    if (!postToDelete || !isOwnProfile) {
      return;
    }

    try {
      await deletePost(postToDelete.id);
      
      window.dispatchEvent(new Event("posts:changed"));

      setPosts((currentPosts) => {
        const updatedPosts = currentPosts.filter(
          (post) => post.id !== postToDelete.id,
        );

        onPostsCountChange?.(updatedPosts.length);

        return updatedPosts;
      });

      setLikedPosts((currentPosts) =>
        currentPosts.filter((post) => post.id !== postToDelete.id),
      );

      setPostToDelete(null);
      setShowSuccess(true);

      window.setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Failed to delete post:", error);

      setPostToDelete(null);
    }
  };

  const getPostAuthorName = (post: ProfilePost) => {
    const currentPost = post as ProfilePostWithRelations;

    return currentPost.author?.name || currentPost.post?.author?.name || "User";
  };

  const getPostUsername = (post: ProfilePost) => {
    const currentPost = post as ProfilePostWithRelations;

    const email = currentPost.author?.email || currentPost.post?.author?.email;

    if (email) {
      return getUsernameFromEmail(email);
    }

    return "user";
  };

  const getPostLikes = (post: ProfilePost) => {
    const currentPost = post as ProfilePostWithRelations;

    if (typeof currentPost._count?.likes === "number") {
      return currentPost._count.likes;
    }

    if (Array.isArray(currentPost.likes)) {
      return currentPost.likes.length;
    }

    return 0;
  };

  const getPostComments = (post: ProfilePost) => {
    const currentPost = post as ProfilePostWithRelations;

    if (typeof currentPost._count?.comments === "number") {
      return currentPost._count.comments;
    }

    if (Array.isArray(currentPost.comments)) {
      return currentPost.comments.length;
    }

    return 0;
  };

  const getPostAvatar = (post: ProfilePost) => {
    const currentPost = post as ProfilePostWithRelations;

    const authorId = currentPost.author?.id || currentPost.post?.author?.id;

    const snapshotImage =
      currentPost.author?.image || currentPost.post?.author?.image || undefined;

    const isProfileAuthor =
      authorId === userId || (isOwnProfile && activeTab === "posts");

    if (isProfileAuthor && profileImage !== undefined) {
      return profileImage || undefined;
    }

    return snapshotImage;
  };

  const getPostLikesData = (post: ProfilePost) => {
    const currentPost = post as ProfilePostWithRelations;

    return currentPost.likes ?? [];
  };

  const getPostCommentsData = (post: ProfilePost) => {
    const currentPost = post as ProfilePostWithRelations;

    return currentPost.comments ?? [];
  };

  if (isLoading) {
    return (
      <div
        className="
          flex
          min-h-[180px]
          w-full
          items-center
          justify-center
          text-[14px]
          text-(--color-content-secondary)
        "
      >
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
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
          text-red-500
        "
      >
        {error}
      </div>
    );
  }

  return (
    <section className="w-full">
      {showSuccess && <SuccessModal message="Post deleted successfully" />}

      {postToDelete && (
        <ConfirmModal
          onCancel={() => setPostToDelete(null)}
          onConfirm={handleDeletePost}
        />
      )}

      {/* Profile Tabs */}
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
        <button
          type="button"
          onClick={() => setActiveTab("posts")}
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
                ? "border-(--color-tab-active-border) bg-(--color-tab-active-bg) text-(--color-content-primary) shadow-sm"
                : "border-transparent bg-transparent text-(--color-content-secondary)"
            }
          `}
        >
          Posts
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("likes")}
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
                ? "border-(--color-tab-active-border) bg-(--color-tab-active-bg) text-(--color-content-primary) shadow-sm"
                : "border-transparent bg-transparent text-(--color-content-secondary)"
            }
          `}
        >
          Likes
        </button>
      </div>

      {/* Posts */}
      <div
        className="
          mt-5
          flex
          w-full
          flex-col
          gap-4
        "
      >
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post) => (
            <PostCard
              key={post.id}
              postId={post.id}
              name={getPostAuthorName(post)}
              username={getPostUsername(post)}
              avatar={getPostAvatar(post)}
              createdAt={post.createdAt}
              content={post.content}
              likes={getPostLikes(post)}
              comments={getPostComments(post)}
              likesData={getPostLikesData(post)}
              commentsData={getPostCommentsData(post)}
              showDelete={activeTab === "posts" && isOwnProfile}
              onDelete={() => setPostToDelete(post)}
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
            {activeTab === "posts" ? "No posts yet." : "No liked posts yet."}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePosts;
