export const isTokenFresh = (expiresIn: number) => {
  const now = Math.floor(Date.now() / 1000);
  return now < expiresIn + 60 * 10 * -1;
};
