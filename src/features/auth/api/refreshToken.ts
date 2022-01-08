import { useAuthStore } from "@/stores";
import { refreshAsync } from "expo-auth-session";
import { CLIENT_ID, discovery } from "..";
import { isTokenFresh } from "../utils/isTokenFresh";

export const refreshToken = async (
  expiresIn: number,
  issuedAt: number,
  refreshToken: string
) => {
  const isFresh = isTokenFresh(expiresIn, issuedAt);

  if (isFresh) {
    return;
  }
  console.log("ran refresh token");

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
