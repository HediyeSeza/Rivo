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