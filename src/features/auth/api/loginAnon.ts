import { useAuthStore } from "@/stores";
import axios from "axios";
import { CLIENT_ID } from "../authConstants";
const Buffer = require("buffer").Buffer;

export const loginAnon = async () => {
  console.log("ran login anon");
  const auth = Buffer.from(CLIENT_ID + ":" + "").toString("base64");
  const body = new FormData();
  body.append("grant_type", "https://oauth.reddit.com/grants/installed_client");
  body.append("device_id", "DO_NOT_TRACK_THIS_DEVICE");
  const res = await axios({
    url: "https://www.reddit.com/api/v1/access_token",
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: body,
  });

  useAuthStore.getState().setTokenAnon(res.data);
};
