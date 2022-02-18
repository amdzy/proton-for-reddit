import { User } from '@/features/users/types';

export interface UsersRes {
  children: Array<{ kind: string; data: User }>;
}
