import { useEffect, useState } from "react";

import PostCard from "../PostCard/PostCard";
import CreatePost from "../CreatePost/CreatePost";

import Loading from "../../loading/Loading";
import SuccessModal from "../../common/Modal/SuccessModal";
import ConfirmModal from "../../common/Modal/ConfirmModal";

import { useAuth } from "../../../context/AuthContext";
import { getPosts, type Post } from "../../../services/postApi";

import {
  deletePost,
  getPosts,
  type Post,
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

const [postToDelete, setPostToDelete] =
  useState<PostWithAuthor | null>(null);

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
  console.error("Failed to load posts:", error);
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
    void fetchPosts();
  }, []);

  const handlePostCreated = async () => {

    setShowSuccess(true);

    window.setTimeout(() => {
      setShowSuccess(false);
    }, 5000);

    await fetchPosts(false);
   };

  const handleDeletePost = async () => {
    if (!postToDelete) return;

    try {
      await deletePost(postToDelete.id);

      setPosts((currentPosts) =>
        currentPosts.filter(
          (post) => post.id !== postToDelete.id,
        ),
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
        error instanceof Error
          ? error.message
          : "Failed to delete post.",
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
          <SuccessModal message={successMessage} />
        )}

        {postToDelete && (
          <ConfirmModal
            onCancel={() => setPostToDelete(null)}
            onConfirm={handleDeletePost}
          />
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
                username={getUsernameFromEmail(
                  post.author.email,
                )}
                createdAt={post.createdAt}
                content={post.content}
                likes={0}
                comments={0}
avatar={
  post.author.image ??
  post.author.avatar ??
  undefined
}
showDelete={
  post.author.id === user?.id
}
onDelete={() =>
  setPostToDelete(post)
}
/>
))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Feed;