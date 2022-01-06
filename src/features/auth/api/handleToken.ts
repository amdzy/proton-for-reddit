import { useAuthStore } from "@/stores";
import { loginAnon } from "../api/loginAnon";
import { refreshToken } from "./refreshToken";
import { isTokenFresh } from "../utils/isTokenFresh";

export const handleToken = async () => {
  const token = useAuthStore.getState().token;
  const expiresIn = useAuthStore.getState().expiresIn;
  const refresh = useAuthStore.getState().refreshToken;

  if (refresh && expiresIn) {
    await refreshToken(expiresIn, refresh);
    return;
  }

  if (!token || !expiresIn) {
    await loginAnon();
    return;
  }

  if (!isTokenFresh(expiresIn)) {
    await loginAnon();
    return;
  }
};
