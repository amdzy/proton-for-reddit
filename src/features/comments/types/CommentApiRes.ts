import { PostsApiResponse } from '@/features/posts/types';
import { Comment } from './Comment';

export type CommentApiRes = [
  {
    kind: 'Listing';
    data: PostsApiResponse;
  },
  {
    kind: 'listing';
    data: {
      after: null;
      before: null;
      children: Array<{
        kind: string;
        data: Comment;
      }>;
    };
  }
];
