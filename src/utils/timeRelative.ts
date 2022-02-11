import { formatDistanceToNowStrict } from 'date-fns';

export function timeRelative(time: number) {
  try {
    return formatDistanceToNowStrict(time * 1000);
  } catch {
    return '';
  }
}
