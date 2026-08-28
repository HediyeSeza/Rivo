import { useEffect, useState } from "react";

import PostCard from "../PostCard/PostCard";
import CreatePost from "../CreatePost/CreatePost";
import Loading from "../../loading/Loading";
import SuccessModal from "../../common/Modal/SuccessModal";

import { getPosts, type Post } from "../../../services/postApi";
import { getUsernameFromEmail } from "../../../utils/getUsernameFromEmail";

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [likeMessage, setLikeMessage] = useState<string | null>(null);

  const fetchPosts = async (showLoading = true) => {
    try {
      if (showLoading) {
        setIsLoading(true);
      }

      setError(null);

      const postsData = await getPosts();

      console.log("POSTS FROM API:", postsData);

      console.log(
        "POST LIKES:",
        postsData.map((post) => ({
          postId: post.id,
          likes: post.likes,
          likesCount: post._count?.likes,
        })),
      );

      setPosts(postsData);
    } catch (error) {
      console.error("Failed to fetch posts:", error);

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
      {likeMessage && (
        <div
          className="
            fixed
            top-4
            left-1/2
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

      <div className="mx-auto w-full">
        {/* Success message */}
        {showSuccess && <SuccessModal message="Post created successfully" />}

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
                onLikeMessage={handleLikeMessage}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Feed;
