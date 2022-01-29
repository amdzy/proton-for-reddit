import { Post } from './Post';

export interface PostsApiResponse {
  after: string;
  before?: string;
  dist: number;
  children: Array<{
    data: Post;
  }>;
}
