import { useAuthStore } from "@/stores";
import { loginAnon } from "../api/loginAnon";
import { refreshToken } from "./refreshToken";
import { isTokenFresh } from "../utils/isTokenFresh";

export const handleToken = async () => {
  const token = useAuthStore.getState().token;
  const expiresIn = useAuthStore.getState().expiresIn;
  const issuedAt = useAuthStore.getState().issuedAt;
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
      return;
    }
  } catch (err) {
    return;
  }
};
