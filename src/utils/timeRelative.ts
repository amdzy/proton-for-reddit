import { formatDistanceToNowStrict } from 'date-fns';

export function timeRelative(time: number) {
  return formatDistanceToNowStrict(time * 1000);
}
