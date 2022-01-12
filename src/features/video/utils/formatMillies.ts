import { millisecondsToSeconds, millisecondsToMinutes } from "date-fns";

export const formatMillies = (millies: number): string => {
  let seconds: number | string = millisecondsToSeconds(millies) % 60;
  let minutes: number | string = millisecondsToMinutes(millies) % 60;
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  minutes = minutes > 9 ? minutes : `0${minutes}`;
  return `${minutes}:${seconds}`;
};
