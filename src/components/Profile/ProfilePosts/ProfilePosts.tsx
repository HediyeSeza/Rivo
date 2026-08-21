import { useState } from "react";
import PostCard from "../../Home/PostCard/PostCard";

type ProfileTab = "posts" | "likes";

interface ProfilePostsProps {
  isOwnProfile: boolean;
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

const userPosts: ProfilePost[] = [
  {
    id: 1,
    name: "Pedram",
    username: "pedram",
    createdAt: "2025-08-15T10:00:00Z",
    content:
      "Sometimes the smallest steps in the right direction end up being the biggest steps of your life.",
    likes: 24,
    comments: 5,
  },
  {
    id: 2,
    name: "Pedram",
    username: "pedram",
    createdAt: "2025-08-14T12:00:00Z",
    content:
      "A clean interface is not just about how it looks. It is about how naturally it feels to use.",
    likes: 31,
    comments: 8,
  },
];

const userLikedPosts: ProfilePost[] = [
  {
    id: 3,
    name: "Sara",
    username: "sara",
    createdAt: "2025-08-15T08:00:00Z",
    content:
      "Working on something new today. Small progress is still progress. ✨",
    likes: 18,
    comments: 3,
  },
  {
    id: 4,
    name: "Matin",
    username: "matin",
    createdAt: "2025-08-14T12:00:00Z",
    content:
      "Good design is not only about appearance. It is about creating a simple and enjoyable experience.",
    likes: 31,
    comments: 8,
  },
];

const ProfilePosts = ({ isOwnProfile }: ProfilePostsProps) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");

  const [posts, setPosts] = useState<ProfilePost[]>(userPosts);

  const [likedPosts, setLikedPosts] = useState<ProfilePost[]>(userLikedPosts);

  const displayedPosts = activeTab === "posts" ? posts : likedPosts;

  const handleDeletePost = (postId: number) => {
    if (!isOwnProfile) return;

    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId),
    );
  };

  const handleRemoveLike = (postId: number) => {
    if (!isOwnProfile) return;

    setLikedPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId),
    );
  };

  return (
    <section className="w-full">
      <div
  className="
    flex
    w-full
    rounded-lg
    bg-[#efeded]
    p-1
    dark:bg-[#262626]
  "
>
  <button
    type="button"
    onClick={() => setActiveTab("posts")}
    aria-pressed={activeTab === "posts"}
    className={`
      flex
      min-h-[32px]
      flex-1
      items-center
      justify-center
      rounded-lg
      px-4
      text-[14px]
      font-medium
      transition-all
      duration-200

      ${
        activeTab === "posts"
          ? `
            bg-white
            text-[#171717]
            shadow-sm
            dark:bg-[#313131]
            dark:text-[#171717]
            
          `
          : `
            bg-transparent
            text-[#737373]
            dark:text-[#A3A3A3]
          `
      }
    `}
  >
    Posts
  </button>


  <button
    type="button"
    onClick={() => setActiveTab("likes")}
    aria-pressed={activeTab === "likes"}
    className={`
      flex
      min-h-[32px]
      flex-1
      items-center
      justify-center
      rounded-lg
      px-4
      text-[14px]
      font-medium
      transition-all
      duration-200

      ${
        activeTab === "likes"
          ? `
            bg-white
            text-[#171717]
            shadow-sm
            dark:bg-[#313131]
            dark:text-[#171717]
          `
          : `
            bg-transparent
            text-[#737373]
            dark:text-[#A3A3A3]
          `
      }
    `}
  >
    Likes
  </button>
</div>

      <div className="mt-5 flex w-full flex-col gap-4 ">
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
             
              showDelete={activeTab === "posts" && isOwnProfile}
              onDelete={() => handleDeletePost(post.id)}
            
              isLiked={activeTab === "likes"}
            
              showUnlike={activeTab === "likes" && isOwnProfile}
              onUnlike={() => handleRemoveLike(post.id)}
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
              border-(--color-border)]
              bg-(--color-card)]
              px-5
              text-center
              text-[14px]
              text-(--color-content-secondary)]
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
