import { useEffect, useState } from 'react';
import {
  useAuthRequest,
  makeRedirectUri,
  exchangeCodeAsync,
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useAuthStore, useSubStore, useToastStore } from '@/stores';
import { axios } from '@/lib/axios';
import { CLIENT_ID, REDIRECT_URI, discovery } from '../authConstants';
import { queryClient } from '@/lib/react-query';

WebBrowser.maybeCompleteAuthSession();

export function useRedditAuth() {
  const addToast = useToastStore((state) => state.addToast);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const setSubs = useSubStore((state) => state.setSubs);
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
        const [user, subsRes] = await Promise.all([
          axios.get('/api/v1/me'),
          axios.get('/subreddits/mine/subscriber'),
        ]);
        const subs = subsRes.data.children.map((sub: any) => ({
          icon: sub.data.icon_img || sub.data.community_icon,
          name: sub.data.display_name,
          id: sub.data.name,
        }));
        setUser({
          icon: user.icon_img,
          name: user.name,
          karma: user.total_karma,
          id: user.id,
          createdAt: user.created_utc,
        });
        setSubs(subs);
        queryClient.clear();
      }
    }

    if (!isAuthenticated) {
      updateFromAuthResponseAsync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authResponse]);

  return {
    authRequest,
    isAuthenticated,
    authenticateAsync: () => promptAsync(),
  };
}
