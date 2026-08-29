export type UserCounts = {
  followers: number;
  following: number;
  posts: number;
};

type CountSource = {
  _count?: {
    followers?: number;
    following?: number;
    followings?: number;
    posts?: number;
  } | null;
} | null | undefined;

export function getUserCounts(
  user: CountSource,
): UserCounts {
  return {
    followers: user?._count?.followers ?? 0,

    following:
      user?._count?.following ??
      user?._count?.followings ??
      0,

    posts: user?._count?.posts ?? 0,
  };
}