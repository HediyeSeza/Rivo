import { api } from "./api";

export interface Post {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
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

export interface CreatePostPayload {
  content: string;
}

interface CreatePostResponse {
  message: string;
  success: boolean;
  data: Post;
}

export const createPost = async (
  data: CreatePostPayload,
): Promise<Post> => {
  const response = await api.post<CreatePostResponse>(
    "/api/posts",
    data,
  );
  return response.data;
};

export const deletePost = async (
  postId: string,
): Promise<void> => {
  await api.delete(`/api/posts/${postId}`);
};