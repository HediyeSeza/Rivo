export interface Post {
  id: string | number;
  content: string;
  createdAt?: string;
  likes?: number;
  comments?: number;
  likesCount?: number;
  commentsCount?: number;
  isLiked?: boolean;
  author?: {
    id: string | number;
    name: string;
    username?: string;
    avatar?: string;
  };
}
