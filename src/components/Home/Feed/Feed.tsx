import { useEffect, useState } from "react";

import PostCard from "../PostCard/PostCard";
import CreatePost from "../CreatePost/CreatePost";
import Loading from "../../loading/Loading";
import SuccessModal from "../../common/Modal/SuccessModal";

import { getPosts, type Post } from "../../../services/postApi";
import { getUserById, type User } from "../../../services/userApi";

import { getUsernameFromEmail } from "../../../utils/getUsernameFromEmail";

type PostWithAuthor = Post & {
  author: User;
};

const Feed = () => {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
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

      const uniqueAuthorIds = [
        ...new Set(postsData.map((post) => post.authorId)),
      ];

      const users = await Promise.all(
        uniqueAuthorIds.map((id) => getUserById(id)),
      );

      const usersMap = new Map(users.map((user) => [user.id, user]));

      const postsWithAuthors = postsData
        .map((post) => {
          const author = usersMap.get(post.authorId);

          if (!author) {
            return null;
          }

          return {
            ...post,
            author,
          };
        })
        .filter((post): post is PostWithAuthor => post !== null);

      setPosts(postsWithAuthors);
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
    const timer = window.setTimeout(() => {
      fetchPosts();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const handlePostCreated = async () => {
    setShowSuccess(true);

    window.setTimeout(() => {
      setShowSuccess(false);
    }, 5000);

    await fetchPosts(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <section className="w-full">
        <div className="mx-auto w-full">
          {likeMessage && (
            <div
              className="
      mb-4
      w-full
      rounded-lg
      border
      border-[var(--color-border)]
      bg-[var(--color-card)]
      px-4
      py-3
      text-sm
      text-[var(--color-content-primary)]
    "
            >
              {likeMessage}
            </div>
          )}
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
          fixed top-4 left-1/2 -translate-x-1/2 z-50
          rounded-lg border border-[var(--color-border)]
          bg-[var(--color-card)] px-4 py-2
          text-sm text-[var(--color-content-primary)]
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
                name={post.author.name}
                username={getUsernameFromEmail(post.author.email)}
                createdAt={post.createdAt}
                content={post.content}
                likes={post._count.likes}
                comments={post._count.comments}
                avatar={post.author.image ?? undefined}
                likesData={post.likes}
                onLikeMessage={(message) => {
                  setLikeMessage(message);
                  window.setTimeout(() => {
                    setLikeMessage(null);
                  }, 2000);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Feed;
