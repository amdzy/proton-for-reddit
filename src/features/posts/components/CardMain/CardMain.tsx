import { useFilterStore, useSettingsStore } from "@/stores";
import { useNavigation } from "@react-navigation/core";
import React, { useMemo } from "react";
import { Dimensions } from "react-native";
import { mediaDTO, PreviewDTO } from "../../types";
import { CardText } from "../CardText/CardText";
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";
import { PostImage } from "../PostImage/PostImage";
import { ImageWithIcon } from "../ImageWithIcon/ImageWithIcon";
import { YoutubeImage } from "../YoutubeImage/YoutubeImage";

interface Props {
  selftext: string;
  hint?: string;
  preview: PreviewDTO;
  media: mediaDTO | null;
  isGallery: boolean;
  mediaMetadata: any;
  galleryData: {
    items: Array<{ media_id: string }>;
  };
  isVideo: boolean;
  url: string;
  fullText?: boolean;
  isNsfw: boolean;
  openLink: () => void;
}

export const CardMain = ({
  selftext,
  hint,
  preview,
  media,
  isGallery,
  mediaMetadata,
  galleryData,
  isVideo,
  url,
  fullText,
  isNsfw,
  openLink,
}: Props) => {
  const navigation = useNavigation<any>();
  const dataSaver = useSettingsStore((state) => state.dataSaver);
  const blurNsfw = useFilterStore((state) => state.posts.blurNsfw);
  const carousel = useSettingsStore((state) => state.card.carousel);

  const handleImageChoice = () => {
    let image = preview.images[0].source;

    if (dataSaver) {
      image =
        preview.images[0].resolutions[1] || preview.images[0].resolutions[0];
    }
    if (isNsfw && blurNsfw) {
      image = preview.images[0].variants.obfuscated.source;
    }
    if (isNsfw && blurNsfw && dataSaver) {
      image =
        preview.images[0].variants.obfuscated.resolutions[1] ||
        preview.images[0].variants.obfuscated.resolutions[0];
    }
    return image;
  };

  if (selftext) {
    return <CardText text={selftext} fullText={fullText} />;
  }

  if (hint === "image") {
    const image = handleImageChoice();
    if (preview.images[0].variants.mp4) {
      let media = preview.images[0].variants.mp4.source;
      if (dataSaver) {
        media =
          preview.images[0].variants.mp4.resolutions[1] ||
          preview.images[0].variants.mp4.resolutions[0];
      }
      return (
        <ImageWithIcon
          url={image.url}
          width={media.width}
          height={media.height}
          onPress={() => navigation.navigate("Video", { videoUrl: media.url })}
        />
      );
    }

    return (
      <PostImage
        url={image.url}
        width={image.width}
        height={image.height}
        onPress={() => {
          navigation.navigate("Images", {
            images: [preview.images[0].source],
          });
        }}
      />
    );
  }

  if (isGallery) {
    const { imgArr, imgSourceArr, singleImage } = useMemo(() => {
      const arr: any = [];
      let img: any;
      const imgArr = galleryData.items.map(({ media_id }, i) => {
        let image = mediaMetadata[media_id].s;
        arr.push({ url: image.u, width: image.x, height: image.y });
        if (dataSaver) {
          image = mediaMetadata[media_id].p[1] || mediaMetadata[media_id].p[0];
        }
        if (isNsfw && blurNsfw) {
          image = mediaMetadata[media_id].o[0];
        }
        if (i === 0) {
          img = { url: image.u, width: image.x, height: image.y };
        }
        return { url: image.u, width: image.x, height: image.y };
      });
      return { imgArr: imgArr, imgSourceArr: arr, singleImage: img };
    }, []);

    const handlePress = () => {
      navigation.navigate("Images", { images: imgSourceArr });
    };
    if (carousel) {
      return <ImageCarousel images={imgArr} onPress={handlePress} />;
    } else {
      return (
        <ImageWithIcon
          url={singleImage.url}
          width={singleImage.width}
          height={singleImage.height}
          icon="image-multiple-outline"
          onPress={handlePress}
        />
      );
    }
  }

  if (isVideo && media) {
    const video = media.reddit_video;

    const image = handleImageChoice();
    return (
      <ImageWithIcon
        url={image.url}
        width={video.width}
        height={video.height}
        onPress={() =>
          navigation.navigate("Video", {
            metaUrl: video.dash_url,
            baseUrl: url,
          })
        }
      />
    );
  }

  if (hint === "rich:video") {
    if (preview.reddit_video_preview) {
      const video = preview.reddit_video_preview;
      const image = handleImageChoice();
      return (
        <ImageWithIcon
          url={image.url}
          width={video.width}
          height={video.height}
          onPress={() =>
            navigation.navigate("Video", {
              metaUrl: video.dash_url,
              baseUrl: url,
            })
          }
        />
      );
    }

    if (media && media.oembed) {
      const image = media.oembed;
      return (
        <YoutubeImage
          url={image.thumbnail_url}
          width={image.thumbnail_width}
          height={image.thumbnail_height}
          onPress={openLink}
        />
      );
    }
  }

  if (hint === "link" && preview.reddit_video_preview) {
    const video = preview.reddit_video_preview;
    const image = handleImageChoice();
    return (
      <ImageWithIcon
        url={image.url}
        width={video.width}
        height={video.height}
        onPress={() =>
          navigation.navigate("Video", {
            metaUrl: video.dash_url,
            baseUrl: url,
          })
        }
      />
    );
  }

  if (url.slice(-3) === "mp4") {
    return (
      <ImageWithIcon
        url={""}
        width={Dimensions.get("screen").width}
        height={250}
        onPress={() =>
          navigation.navigate("Video", {
            videoUrl: url,
          })
        }
      />
    );
  }

  return null;
};
