import PostCard from "../PostCard/PostCard";

const posts = [
  {
    id: 1,
    name: "Amin",
    username: "amin",
    createdAt: "2025-08-15T10:00:00Z",
    content:
      "Sometimes the smallest steps in the right direction end up being the biggest steps of your life.",
    likes: 24,
    comments: 5,
  },
  {
    id: 2,
    name: "Sara",
    username: "sara",
    createdAt: "2025-08-15T08:00:00Z",
    content:
      "Working on something new today. Small progress is still progress. ✨",
    likes: 18,
    comments: 3,
  },
  {
    id: 3,
    name: "Matin",
    username: "matin",
    createdAt: "2025-08-14T12:00:00Z",
    content:
      "A clean interface is not just about how it looks. It is about how naturally it feels to use.",
    likes: 31,
    comments: 8,
  },
];

const Feed = () => {
  return (
    <section
      className="
        flex
        w-full
        flex-col
        gap-4
      "
    >
      {posts.map((post) => (
        <PostCard
          key={post.id}
          name={post.name}
          username={post.username}
          createdAt={post.createdAt}
          content={post.content}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </section>
  );
};

export default Feed;
