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
  const response = await api.patch<ToggleLikeResponse>(
    `/api/posts/${postId}`,
  );

  return response;
};

interface CreatePostResponse {
  message: string;
  success: boolean;
  data: Post;
}

export interface CreatePostPayload {
  content: string;
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

export interface CreateCommentResponse {
  message: string;
  success: boolean;
}

export const createComment = async (
  postId: string,
  content: string,
): Promise<CreateCommentResponse> => {
  const response =
    await api.post<CreateCommentResponse>(
      `/api/posts/${postId}/comment`,
      {
        content,
      },
    );

  return response;
};