import { useEffect, useState } from "react";
import {
  useAuthRequest,
  makeRedirectUri,
  exchangeCodeAsync,
} from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useAuthStore, useToastStore } from "@/stores";
import { CLIENT_ID, discovery, REDIRECT_URI } from "@/features/auth";

WebBrowser.maybeCompleteAuthSession();

export default function useRedditAuth() {
  const addToast = useToastStore((state) => state.addToast);
  const setToken = useAuthStore((state) => state.setToken);
  const loggedIn = useAuthStore((state) => state.isAuthenticated);
  const [isAuthenticated, setIsAuthenticated] = useState(loggedIn);

  const [authRequest, authResponse, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: [
        "identity",
        "edit",
        "flair",
        "history",
        "modconfig",
        "modflair",
        "modlog",
        "modposts",
        "modwiki",
        "mysubreddits",
        "privatemessages",
        "read",
        "report",
        "save",
        "submit",
        "subscribe",
        "vote",
        "wikiedit",
        "wikiread",
      ],
      redirectUri: makeRedirectUri({
        native: REDIRECT_URI,
      }),
      extraParams: {
        duration: "permanent",
      },
    },
    discovery
  );

  useEffect(() => {
    async function updateFromAuthResponseAsync() {
      if (authResponse === null) {
        return;
      } else if (authResponse.type === "error") {
        addToast({
          type: "error",
          text:
            authResponse.error?.message ?? "Error Logging In, Please try again",
        });
        return;
      } else if (authResponse.type === "success") {
        const result = await exchangeCodeAsync(
          {
            clientId: CLIENT_ID,
            code: authResponse.params.code,
            redirectUri: REDIRECT_URI,
            clientSecret: "",
          },
          discovery
        );
        setToken(result);
      }
    }

    if (!isAuthenticated) {
      updateFromAuthResponseAsync();
    }
  }, [authResponse]);

  return {
    authRequest,
    isAuthenticated,
    authenticateAsync: () => promptAsync(),
  };
}
