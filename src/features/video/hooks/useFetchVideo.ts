import { useEffect, useState } from "react";
import { parseStringPromise } from "xml2js";

export const useFetchVideo = (url: string) => {
  const [audioId, setAudioId] = useState("");
  const [videoIds, setVideoIds] = useState<
    Array<{ url: string; quality: string }>
  >([]);

  useEffect(() => {
    const fetchUrl = async () => {
      const res = await fetch(url);
      const data = await res.text();
      const parsedData: XmlRes = await parseStringPromise(data);
      const audio =
        parsedData.MPD.Period[0].AdaptationSet[0].Representation[0].BaseURL[0];
      const videos =
        parsedData.MPD.Period[0].AdaptationSet[1].Representation.map((item) => {
          return { url: item.BaseURL[0], quality: item.$.height };
        });
      setAudioId(audio);
      setVideoIds(videos);
    };
    if (url) {
      fetchUrl();
    }
  }, []);
  return { audioId, videoIds };
};
