import { useAuthStore } from '@/stores';
import { loginAnon } from './loginAnon';
import { refreshToken } from './refreshToken';
import { isTokenFresh } from '../utils/isTokenFresh';

export const handleToken = async () => {
  const { token } = useAuthStore.getState();
  const { expiresIn } = useAuthStore.getState();
  const { issuedAt } = useAuthStore.getState();
  const refresh = useAuthStore.getState().refreshToken;
  try {
    if (refresh && expiresIn && issuedAt) {
      await refreshToken(expiresIn, issuedAt, refresh);
      return;
    }

    if (!token || !expiresIn || !issuedAt) {
      await loginAnon();
      return;
    }

    if (!isTokenFresh(expiresIn, issuedAt)) {
      await loginAnon();
    }
  } catch (err) {
    console.log(err);
  }
};
