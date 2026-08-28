import { useEffect, useState } from "react";

import PostCard from "../PostCard/PostCard";
import CreatePost from "../CreatePost/CreatePost";

import Loading from "../../loading/Loading";

import SuccessModal from "../../common/Modal/SuccessModal";
import ConfirmModal from "../../common/Modal/ConfirmModal";

import { useAuth } from "../../../context/AuthContext";

import {
  deletePost,
  getPosts,
  type Post,
  type PostComment,
} from "../../../services/postApi";

import { getUsernameFromEmail } from "../../../utils/getUsernameFromEmail";

type PostWithAuthor = Post & {
  author: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    avatar?: string | null;
  };
};

const Feed = () => {
  const { user } = useAuth();

  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [commentMessage, setCommentMessage] = useState<string | null>(null);

  const [likeMessage, setLikeMessage] = useState<string | null>(null);

  const [postToDelete, setPostToDelete] = useState<PostWithAuthor | null>(null);

  const fetchPosts = async (showLoading = true) => {
    try {
      if (showLoading) {
        setIsLoading(true);
      }

      setError(null);

      const postsData = await getPosts();

      setPosts(postsData as PostWithAuthor[]);
    } catch (error) {
      console.error("Failed to load posts:", error);

      setError(
        error instanceof Error ? error.message : "Failed to load posts.",
      );
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    void fetchPosts();
  }, []);

  const handlePostCreated = async () => {
    setSuccessMessage("Post created successfully");
    setShowSuccess(true);

    window.setTimeout(() => {
      setShowSuccess(false);
    }, 5000);

    await fetchPosts(false);
  };

  const handleLikeMessage = (message: string) => {
    setLikeMessage(message);

    window.setTimeout(() => {
      setLikeMessage(null);
    }, 2000);
  };

  const handleCommentAdded = async (postId: string) => {
    try {
      await fetchPosts(false);
    } catch (error) {
      console.error(`Failed to refresh post ${postId}:`, error);
    }
  };

  const handleCommentMessage = (message: string) => {
    setCommentMessage(message);

    window.setTimeout(() => {
      setCommentMessage(null);
    }, 3000);
  };

  const handleDeletePost = async () => {
    if (!postToDelete) {
      return;
    }

    try {
      await deletePost(postToDelete.id);

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post.id !== postToDelete.id),
      );

      setPostToDelete(null);

      setSuccessMessage("Post deleted successfully");
      setShowSuccess(true);

      window.setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Failed to delete post:", error);

      setError(
        error instanceof Error ? error.message : "Failed to delete post.",
      );

      setPostToDelete(null);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <section className="w-full">
        <div className="mx-auto w-full">
          <p
            className="
              text-center
              text-sm
              text-[var(--color-content-secondary)]
            "
          >
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      {/* Like message */}
      {likeMessage && (
        <div
          className="
            fixed
            left-1/2
            top-4
            z-50
            -translate-x-1/2
            rounded-lg
            border
            border-[var(--color-border)]
            bg-[var(--color-card)]
            px-4
            py-2
            text-sm
            text-[var(--color-content-primary)]
            shadow-md
          "
        >
          {likeMessage}
        </div>
      )}

      {commentMessage && (
        <div
          className="
      fixed
      left-1/2
      top-4
      z-50
      -translate-x-1/2
      rounded-lg
      border
      border-[var(--color-border)]
      bg-[var(--color-card)]
      px-4
      py-2
      text-sm
      text-[var(--color-content-primary)]
      shadow-md
    "
        >
          {commentMessage}
        </div>
      )}

      <div className="mx-auto w-full">
        {/* Success message */}
        {showSuccess && <SuccessModal message={successMessage} />}

        {/* Delete confirmation */}
        {postToDelete && (
          <ConfirmModal
            onCancel={() => setPostToDelete(null)}
            onConfirm={handleDeletePost}
          />
        )}

        {/* Create Post */}
        <CreatePost onPostCreated={handlePostCreated} />

        {/* Posts */}
        {posts.length === 0 ? (
          <p
            className="
              text-center
              text-sm
              text-[var(--color-content-secondary)]
            "
          >
            No posts yet.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                postId={post.id}
                name={post.author?.name ?? "User"}
                username={getUsernameFromEmail(post.author?.email ?? "")}
                createdAt={post.createdAt}
                content={post.content}
                likes={post._count?.likes ?? 0}
                comments={post._count?.comments ?? 0}
                avatar={post.author?.image ?? undefined}
                likesData={post.likes ?? []}
                commentsData={post.comments ?? []}
                showDelete={post.author?.id === user?.id}
                onDelete={() => setPostToDelete(post)}
                onLikeMessage={handleLikeMessage}
                onCommentAdded={handleCommentAdded}
                onCommentMessage={handleCommentMessage}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Feed;
