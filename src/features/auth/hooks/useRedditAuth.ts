import { useEffect, useState } from 'react';
import {
  useAuthRequest,
  makeRedirectUri,
  exchangeCodeAsync,
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useAuthStore, useToastStore } from '@/stores';
import { axios } from '@/lib/axios';
import { CLIENT_ID, REDIRECT_URI, discovery } from '../authConstants';

WebBrowser.maybeCompleteAuthSession();

export function useRedditAuth() {
  const addToast = useToastStore((state) => state.addToast);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const loggedIn = useAuthStore((state) => state.isAuthenticated);
  const [isAuthenticated] = useState(loggedIn);

  const [authRequest, authResponse, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: [
        'identity',
        'edit',
        'flair',
        'history',
        'modconfig',
        'modflair',
        'modlog',
        'modposts',
        'modwiki',
        'mysubreddits',
        'privatemessages',
        'read',
        'report',
        'save',
        'submit',
        'subscribe',
        'vote',
        'wikiedit',
        'wikiread',
      ],
      redirectUri: makeRedirectUri({
        native: REDIRECT_URI,
      }),
      extraParams: {
        duration: 'permanent',
      },
    },
    discovery
  );

  useEffect(() => {
    async function updateFromAuthResponseAsync() {
      if (authResponse === null) {
        return;
      }
      if (authResponse.type === 'error') {
        addToast({
          type: 'error',
          text:
            authResponse.error?.message ?? 'Error Logging In, Please try again',
        });
      } else if (authResponse.type === 'success') {
        const result = await exchangeCodeAsync(
          {
            clientId: CLIENT_ID,
            code: authResponse.params.code,
            redirectUri: REDIRECT_URI,
            clientSecret: '',
          },
          discovery
        );
        setToken(result);
        const res = await axios.get('/api/v1/me');
        console.log(res);
        setUser({
          icon: res.icon_img,
          name: res.name,
          karma: res.total_karma,
          id: res.id,
          createdAt: res.created_utc,
          modhash: res.modhash,
        });
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
