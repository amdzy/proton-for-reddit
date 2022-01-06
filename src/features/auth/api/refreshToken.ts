import { useAuthStore } from "@/stores";
import { refreshAsync } from "expo-auth-session";
import { CLIENT_ID, discovery } from "..";
import { isTokenFresh } from "../utils/isTokenFresh";

export const refreshToken = async (expiresIn: number, refreshToken: string) => {
  const isFresh = isTokenFresh(expiresIn);

  if (isFresh) {
    return;
  }

  const data = await refreshAsync(
    {
      refreshToken: refreshToken,
      clientId: CLIENT_ID,
      clientSecret: "",
    },
    discovery
  );
  useAuthStore.getState().setTokenRefresh(data);
};
