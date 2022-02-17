import { About } from '@/features/sub/types';

export interface CommunitiesRes {
  children: Array<{ kind: string; data: About }>;
}
