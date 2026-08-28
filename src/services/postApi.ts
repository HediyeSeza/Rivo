import { api } from "./api";

export interface PostLike {
  userId: string;
}

export interface PostComment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
    email: string;
    image: string | null;
  };
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;

  author?: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };

  likes: PostLike[];

  comments: PostComment[];

  _count: {
    likes: number;
    comments: number;
  };
}

interface PostsResponse {
  message: string;
  success: boolean;
  data: Post[];
}

export interface ToggleLikeResponse {
  message: string;
  success: boolean;
}

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<PostsResponse>("/api/posts");

  return response.data ?? [];
};

export const toggleLikePost = async (
  postId: string,
): Promise<ToggleLikeResponse> => {
  return api.patch<ToggleLikeResponse>(`/api/posts/${postId}`);
};

interface CreatePostResponse {
  message: string;
  success: boolean;
  data: Post;
}

export const createPost = async (data: { content: string }): Promise<Post> => {
  const response = await api.post<CreatePostResponse>("/api/posts", data);

  return response.data;
};
