import { useFilterStore, useSettingsStore } from "@/stores";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Dimensions } from "react-native";
import { mediaDTO, PreviewDTO } from "../../types";
import { CardText } from "../CardText/CardText";
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";
import { PostImage } from "../PostImage/PostImage";
import { VideoImage } from "../VideoImage/VideoImage";
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
        <VideoImage
          url={image.url}
          width={media.width}
          height={media.height}
          onPress={() =>
            navigation.navigate("Video", {
              videoUrl: media.url,
              imageUrl: image.url,
            })
          }
        />
      );
    }

    return (
      <PostImage url={image.url} width={image.width} height={image.height} />
    );
  }

  if (isGallery) {
    const imgArr = galleryData.items.map(({ media_id }) => {
      let image = mediaMetadata[media_id].s;

      if (dataSaver) {
        image = mediaMetadata[media_id].p[1] || mediaMetadata[media_id].p[0];
      }
      if (isNsfw && blurNsfw) {
        image = mediaMetadata[media_id].o[0];
      }
      return image;
    });

    return <ImageCarousel images={imgArr} />;
  }

  if (hint === "rich:video") {
    if (preview.reddit_video_preview) {
      const video = preview.reddit_video_preview;
      const image = handleImageChoice();
      return (
        <VideoImage
          url={image.url}
          width={video.width}
          height={video.height}
          onPress={() =>
            navigation.navigate("Video", {
              videoUrl: dataSaver
                ? video.scrubber_media_url
                : video.fallback_url,
              imageUrl: image.url,
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
      <VideoImage
        url={image.url}
        width={video.width}
        height={video.height}
        onPress={() =>
          navigation.navigate("Video", {
            videoUrl: dataSaver ? video.scrubber_media_url : video.fallback_url,
            imageUrl: image.url,
          })
        }
      />
    );
  }

  if (isVideo && media) {
    const video = media.reddit_video;

    const image = handleImageChoice();
    return (
      <VideoImage
        url={image.url}
        width={video.width}
        height={video.height}
        onPress={() =>
          navigation.navigate("Video", {
            videoUrl: dataSaver ? video.scrubber_media_url : video.fallback_url,
            imageUrl: image.url,
          })
        }
      />
    );
  }

  if (url.slice(-3) === "mp4") {
    return (
      <VideoImage
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
