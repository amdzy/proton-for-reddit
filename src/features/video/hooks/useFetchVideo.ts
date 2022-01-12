import { useEffect, useState } from "react";
import { parseStringPromise } from "xml2js";

export const useFetchVideo = (url: string) => {
  const [isLoading, setisLoading] = useState(true);
  const [audioId, setAudioId] = useState("");
  const [videoIds, setVideoIds] = useState<
    Array<{ url: string; quality: string }>
  >([]);

  const fetchUrl = async () => {
    if (fetchedUrls.has(url)) {
      const data = fetchedUrls.get(url);
      setAudioId(data.audio);
      setVideoIds(data.videos);
      setisLoading(false);
      return;
    }
    setisLoading(true);
    const res = await fetch(url);
    const data = await res.text();
    const parsedData: XmlRes = await parseStringPromise(data);
    if (parsedData.MPD.Period[0].AdaptationSet[0].$.contentType === "audio") {
      const audio =
        parsedData.MPD.Period[0].AdaptationSet[0].Representation[0].BaseURL[0];
      const videos =
        parsedData.MPD.Period[0].AdaptationSet[1].Representation.map((item) => {
          return { url: item.BaseURL[0], quality: item.$.height };
        });
      fetchedUrls.set(url, { audio, videos });
      setAudioId(audio);
      setVideoIds(videos);
      setisLoading(false);
    }
    if (parsedData.MPD.Period[0].AdaptationSet[0].$.contentType === "video") {
      const videos =
        parsedData.MPD.Period[0].AdaptationSet[0].Representation.map((item) => {
          return { url: item.BaseURL[0], quality: item.$.height };
        });
      fetchedUrls.set(url, { audio: "", videos });
      setVideoIds(videos);
      setisLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      try {
        fetchUrl();
      } catch (err) {
        console.log(err);
      }
    }
  }, [url]);
  return { audioId, videoIds, isLoading };
};

const fetchedUrls = new Map();
