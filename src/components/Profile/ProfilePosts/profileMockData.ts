export interface ProfilePost {
  id: number;
  username: string;
  displayName: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

export const mockPosts: ProfilePost[] = [
  {
    id: 1,
    username: "iran",
    displayName: "Pedram",
    content: "آقای کفاشیان 2",
    createdAt: "1 day ago",
    likes: 4,
    comments: 0,
    isLiked: true,
  },
  {
    id: 2,
    username: "iran",
    displayName: "Pedram",
    content: "آقای کفاشیان",
    createdAt: "5 days ago",
    likes: 2,
    comments: 1,
    isLiked: false,
  },
  {
    id: 3,
    username: "iran",
    displayName: "Pedram",
    content: "Hala madrid",
    createdAt: "7 days ago",
    likes: 1,
    comments: 0,
    isLiked: false,
  },
];

export const mockLikedPosts: ProfilePost[] = [
  {
    id: 4,
    username: "amin1310172",
    displayName: "Amin",
    content: "helloooo",
    createdAt: "17 hours ago",
    likes: 3,
    comments: 1,
    isLiked: true,
  },
  {
    id: 5,
    username: "dev.shahryar",
    displayName: "کیومرث",
    content: "salaam bacheha",
    createdAt: "about 4 hours ago",
    likes: 0,
    comments: 1,
    isLiked: true,
  },
];
