import { format } from 'date-fns';

export function timeFormatted(time: number) {
  return format(time * 1000, 'PPP');
}
