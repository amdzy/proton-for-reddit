import { refreshAsync } from 'expo-auth-session';
import { useAuthStore } from '@/stores';
import { CLIENT_ID, discovery } from '../authConstants';
import { isTokenFresh } from '../utils/isTokenFresh';

export const refreshToken = async (
  expiresIn: number,
  issuedAt: number,
  token: string
) => {
  const isFresh = isTokenFresh(expiresIn, issuedAt);

  if (isFresh) {
    return;
  }
  console.log('ran refresh token');

  const data = await refreshAsync(
    {
      refreshToken: token,
      clientId: CLIENT_ID,
      clientSecret: '',
    },
    discovery
  );
  useAuthStore.getState().setTokenRefresh(data);
};
