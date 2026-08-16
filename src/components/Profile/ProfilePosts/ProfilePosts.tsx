import { useState } from "react";
import Icon from "../../common/Icon/Icon";
import { mockLikedPosts, mockPosts, type ProfilePost } from "./profileMockData";

type ProfileTab = "posts" | "likes";

const ProfilePosts = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");

  const posts: ProfilePost[] =
    activeTab === "posts" ? mockPosts : mockLikedPosts;

  return (
    <section className="w-full">
      {/* Tabs */}
      <div className="mb-6 flex w-full rounded-xl bg-[#F5F5F5] p-1 dark:bg-[#1A1A1A]">
        <button
          type="button"
          onClick={() => setActiveTab("posts")}
          className={`
            flex-1 rounded-lg py-2
            text-[14px] font-medium
            transition-all duration-200
            ${
              activeTab === "posts"
                ? "bg-white shadow-sm dark:bg-[#0A0A0A]"
                : "text-gray-500"
            }
          `}
        >
          Posts
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("likes")}
          className={`
            flex-1 rounded-lg py-2
            text-[14px] font-medium
            transition-all duration-200
            ${
              activeTab === "likes"
                ? "bg-white shadow-sm dark:bg-[#0A0A0A]"
                : "text-gray-500"
            }
          `}
        >
          Likes
        </button>
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-5">
        {posts.map((post) => (
          <ProfilePostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

interface ProfilePostCardProps {
  post: ProfilePost;
}

const ProfilePostCard = ({ post }: ProfilePostCardProps) => {
  return (
    <article
      className="
        rounded-2xl
        border border-[#E5E5E5]
        bg-white
        p-6
        shadow-sm
        dark:border-[#262626]
        dark:bg-[#0A0A0A]
      "
    >
      {/* User */}
      <div className="flex items-center gap-3">
        <img
          src="src\assets\Avatar\a.png"
          alt={post.displayName}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div className="flex items-center gap-3">
          <span className="font-semibold">{post.displayName}</span>

          <span className="text-sm text-gray-500">@{post.username}</span>

          <span className="text-sm text-gray-500">{post.createdAt}</span>
        </div>
      </div>

      {/* Content */}
      <p className="mt-4 text-[16px] leading-7">{post.content}</p>

      {/* Actions */}
      <div className="mt-8 flex items-center gap-8 text-gray-500">
        <button type="button" className="flex items-center gap-2">
          <Icon name="Heart" size={20} />
          <span>{post.likes}</span>
        </button>

        <button type="button" className="flex items-center gap-2">
          <Icon name="Chat" size={20} />
          <span>{post.comments}</span>
        </button>
      </div>
    </article>
  );
};

export default ProfilePosts;
