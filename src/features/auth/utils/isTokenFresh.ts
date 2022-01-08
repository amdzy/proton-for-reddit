export const isTokenFresh = (expiresIn: number, issuedAt: number) => {
  const now = Math.floor(Date.now() / 1000);
  return now < issuedAt + expiresIn + 60 * 10 * -1;
};
