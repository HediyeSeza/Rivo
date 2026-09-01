import { useEffect, useState } from "react";

import PostCard from "../PostCard/PostCard";
import CreatePost from "../CreatePost/CreatePost";
import Loading from "../../loading/Loading";
import ActionModal from "../../common/Modal/ActionModal/ActionModal";
import ErrorScreen from "../../common/ErrorScreen/ErrorScreen";

import { useAuth } from "../../../context/AuthContext";

import { deletePost, getPosts, type Post } from "../../../services/postApi";

import { getUserById } from "../../../services/userApi";
import { getUsernameFromEmail } from "../../../utils/getUsernameFromEmail";

import Toast from "../../Toast/Toast";

type ToastType = "success" | "error";

type PostWithAuthor = Post & {
  author: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    avatar?: string | null;
  };
};

interface ToastState {
  id: number;
  message: string;
  type: ToastType;
}

const Feed = () => {
  const { user, isAuthenticated } = useAuth();

  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [likeToast, setLikeToast] = useState<ToastState | null>(null);

  const [commentToast, setCommentToast] = useState<ToastState | null>(null);

  // -----------------------------------------
  // Delete confirmation
  // -----------------------------------------

  const [deletePostId, setDeletePostId] = useState<string | null>(null);

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

      const postsWithAuthors: PostWithAuthor[] = postsData.flatMap((post) => {
        const author = usersMap.get(post.authorId);

        if (!author) {
          return [];
        }

        return [
          {
            ...post,
            author: {
              id: author.id,
              name: author.name,
              email: author.email,
              image: author.image ?? null,
              avatar: author.avatar ?? null,
            },
          },
        ];
      });

      setPosts(postsWithAuthors);
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

  // -----------------------------------------
  // Post created
  // -----------------------------------------

  const handlePostCreated = async () => {
    setSuccessMessage("Post created successfully");

    setShowSuccess(true);

    await fetchPosts(false);
  };

  // -----------------------------------------
  // Close success modal
  // -----------------------------------------

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  // -----------------------------------------
  // Comment added
  // -----------------------------------------

  const handleCommentAdded = async (postId: string) => {
    try {
      await fetchPosts(false);
    } catch (error) {
      console.error(`Failed to refresh post ${postId}:`, error);
    }
  };

  // -----------------------------------------
  // Like message
  // -----------------------------------------

  const handleLikeMessage = (message: string) => {
    const isError = message.toLowerCase().includes("failed");

    setLikeToast({
      id: Date.now(),
      message,
      type: isError ? "error" : "success",
    });
  };

  // -----------------------------------------
  // Comment message
  // -----------------------------------------

  const handleCommentMessage = (message: string) => {
    const isError = message.toLowerCase().includes("failed");

    setCommentToast({
      id: Date.now(),
      message,
      type: isError ? "error" : "success",
    });
  };

  // -----------------------------------------
  // Open delete confirmation
  // -----------------------------------------

  const handleDeletePost = (postId: string) => {
    setDeletePostId(postId);
  };

  // -----------------------------------------
  // Confirm delete post
  // -----------------------------------------

  const confirmDeletePost = async () => {
    if (!deletePostId) {
      return;
    }

    const postId = deletePostId;

    try {
      await deletePost(postId);

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post.id !== postId),
      );

      setDeletePostId(null);

      setSuccessMessage("Post deleted successfully");

      setShowSuccess(true);
    } catch (error) {
      console.error("Failed to delete post:", error);

      setDeletePostId(null);

      setError(
        error instanceof Error ? error.message : "Failed to delete post.",
      );
    }
  };

  // -----------------------------------------
  // Loading
  // -----------------------------------------

  if (isLoading) {
    return <Loading />;
  }

  // -----------------------------------------
  // Error
  // -----------------------------------------

  if (error) {
    return <ErrorScreen onRetry={() => fetchPosts(true)} />;
  }

  return (
    <section className="w-full">
      {/* Toast */}

      {likeToast && (
        <Toast
          key={likeToast.id}
          message={likeToast.message}
          type={likeToast.type}
          onDone={() => setLikeToast(null)}
        />
      )}

      {commentToast && (
        <Toast
          key={commentToast.id}
          message={commentToast.message}
          type={commentToast.type}
          onDone={() => setCommentToast(null)}
        />
      )}

      <div className="mx-auto w-full">
        {/* Delete Confirmation Modal */}

        <ActionModal
          isOpen={deletePostId !== null}
          variant="danger"
          title="Delete post?"
          description="Are you sure you want to delete this post? This action cannot be undone."
          buttonText="Delete"
          onAction={() => {
            void confirmDeletePost();
          }}
          onClose={() => {
            setDeletePostId(null);
          }}
        />

        {/* Success Action Modal */}

        <ActionModal
          isOpen={showSuccess}
          variant={
            successMessage === "Post deleted successfully"
              ? "danger"
              : "success"
          }
          title={successMessage}
          description={
            successMessage === "Post created successfully"
              ? "Your post has been published and is now visible to others."
              : "Your post has been deleted successfully."
          }
          buttonText="Awesome!"
          onAction={handleCloseSuccess}
          onClose={handleCloseSuccess}
        />

        {/* Create Post */}

        {isAuthenticated && <CreatePost onPostCreated={handlePostCreated} />}

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
                authorId={post.author?.id ?? post.authorId}
                name={post.author?.name ?? "User"}
                username={getUsernameFromEmail(post.author?.email ?? "")}
                createdAt={post.createdAt}
                content={post.content}
                image={post.image ?? undefined}
                likes={post._count?.likes ?? 0}
                comments={post._count?.comments ?? 0}
                avatar={post.author?.image ?? undefined}
                likesData={post.likes ?? []}
                commentsData={post.comments ?? []}
                showDelete={post.author?.id === user?.id}
                onDelete={() => {
                  handleDeletePost(post.id);
                }}
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
