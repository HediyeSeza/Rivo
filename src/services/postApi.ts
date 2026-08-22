import { api } from "./api";


export interface Post {
  id: string | number;
  authorId: string;
  content: string;
  createdAt?: string;
  updatedAt: string;

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

interface PostsResponse {
  message: string;
  success: boolean;
  data: Post[];
}

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<PostsResponse>("/api/posts");

  return response.data;
};
