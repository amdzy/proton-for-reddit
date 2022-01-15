import axios from 'axios';
import { Buffer } from 'buffer';
import { useAuthStore } from '@/stores';
import { CLIENT_ID } from '../authConstants';

export const loginAnon = async () => {
  console.log('ran login anon');
  const auth = Buffer.from(`${CLIENT_ID}:`).toString('base64');
  const body = new FormData();
  body.append('grant_type', 'https://oauth.reddit.com/grants/installed_client');
  body.append('device_id', 'DO_NOT_TRACK_THIS_DEVICE');
  const res = await axios({
    url: 'https://www.reddit.com/api/v1/access_token',
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
  });
  useAuthStore.getState().setTokenAnon(res.data);
};
