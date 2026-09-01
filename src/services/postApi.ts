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
  image?: string | null;
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

/* =========================================
   Get Posts
========================================= */

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<PostsResponse>("/api/posts");

  return response.data ?? [];
};

/* =========================================
   Like / Unlike Post
========================================= */

export interface ToggleLikeResponse {
  message: string;
  success: boolean;
}

export const toggleLikePost = async (
  postId: string,
): Promise<ToggleLikeResponse> => {
  const response = await api.patch<ToggleLikeResponse>(
    `/api/posts/${postId}`,
  );

  return response;
};

/* =========================================
   Create Post
========================================= */

interface CreatePostResponse {
  message: string;
  success: boolean;
  data: Post;
}

export interface CreatePostPayload {
  content: string;
  image?: string | null;
}

export const createPost = async (
  data: CreatePostPayload,
): Promise<Post> => {
  const payload: CreatePostPayload = {
    content: data.content.trim(),
  };

  // فقط اگر واقعاً image داریم، آن را به request اضافه کن
  if (data.image) {
    payload.image = data.image;
  }

  const response = await api.post<CreatePostResponse>(
    "/api/posts",
    payload,
  );

  return response.data;
};

/* =========================================
   Update Post
========================================= */

export interface UpdatePostResponse {
  message: string;
  success: boolean;
  data: Post;
}

export interface UpdatePostPayload {
  content: string;
  image?: string | null;
}

export const updatePost = async (
  postId: string,
  data: UpdatePostPayload,
): Promise<UpdatePostResponse> => {
  const payload: UpdatePostPayload = {
    content: data.content.trim(),
  };

  if (data.image !== undefined) {
    payload.image = data.image;
  }

  const response = await api.put<UpdatePostResponse>(
    `/api/posts/${postId}`,
    payload,
  );

  return response;
};
/* =========================================
   Delete Post
========================================= */

export const deletePost = async (
  postId: string,
): Promise<void> => {
  await api.delete(`/api/posts/${postId}`);
};

/* =========================================
   Create Comment
========================================= */

export interface CreateCommentResponse {
  message: string;
  success: boolean;
}

export const createComment = async (
  postId: string,
  content: string,
): Promise<CreateCommentResponse> => {
  const response = await api.post<CreateCommentResponse>(
    `/api/posts/${postId}/comment`,
    {
      content: content.trim(),
    },
  );

  return response;
};

/* =========================================
   Update Comment
========================================= */

export interface UpdateCommentResponse {
  message: string;
  success: boolean;
  data: PostComment;
}

export const updateComment = async (
  postId: string,
  commentId: string,
  content: string,
): Promise<UpdateCommentResponse> => {
  const response = await api.put<UpdateCommentResponse>(
    `/api/posts/${postId}/comment/${commentId}`,
    {
      content: content.trim(),
    },
  );

  return response;
};

/* =========================================
   Delete Comment
========================================= */

export interface DeleteCommentResponse {
  message: string;
  success: boolean;
}

export const deleteComment = async (
  postId: string,
  commentId: string,
): Promise<DeleteCommentResponse> => {
  const response = await api.delete<DeleteCommentResponse>(
    `/api/posts/${postId}/comment/${commentId}`,
  );

  return response;
};