export enum PostType {
  post = 'post',
  opportunity = 'opportunity',
  interventions = 'interventions',
  program = 'program',
}

export interface IApplication {
  id: string;
  userId: string;
  meta: any | null;
  createdAt: string;
};

export interface IPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  shortDescription: string;
  featuredImage: string | null;
  authorId: number;
  cta: string;
  userType: string;
  likes: number;
  views: number;
  clickCount: number;
  hasComment: boolean;
  isPublished: boolean;
  isFeatured: boolean;
  type: PostType;
  meta: any;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  comments: any[];
  category: any;
  isVerified: boolean;
  applicationLimit: number | null;
  applications: IApplication[] | [],
  applicationDate: string;
  closingDate: string;
}
