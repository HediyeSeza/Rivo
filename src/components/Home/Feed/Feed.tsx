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

      const usersMap = new Map(
        users.map((user) => [user.id, user]),
      );

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
        .filter(
          (post): post is PostWithAuthor => post !== null,
        );

      setPosts(postsWithAuthors);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load posts.",
      );
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
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
          <p className="text-center text-sm text-[var(--color-content-secondary)]">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="mx-auto w-full">
        {showSuccess && (
          <SuccessModal message="Post created successfully" />
        )}

        <CreatePost onPostCreated={handlePostCreated} />

        {posts.length === 0 ? (
          <p className="text-center text-sm text-[var(--color-content-secondary)]">
            No posts yet.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                name={post.author.name}
                username={getUsernameFromEmail(post.author.email)}
                createdAt={post.createdAt}
                content={post.content}
                likes={0}
                comments={0}
                avatar={post.author.avatar}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Feed;