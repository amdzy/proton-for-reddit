import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useTheme } from "@/hooks";
import { PostType } from "../types";
import {
  Awards,
  CardFooter,
  CardMain,
  CardTitle,
  FlairList,
  PostHeader,
} from "../components";

interface Props {
  post: PostType;
  fullText?: boolean;
}

export const PostCard = ({ post, fullText }: Props) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const openLink = () => {
    WebBrowser.openBrowserAsync(post.url);
  };
  return (
    <View style={styles.card}>
      <PostHeader
        subName={post.subreddit_name_prefixed}
        author={post.author}
        createdAt={post.created_utc}
        sub={post.subreddit}
      />
      <CardTitle
        title={post.title}
        thumbnail={post.thumbnail}
        showThumbnail={
          post.post_hint === "link" && post.domain !== "i.imgur.com"
        }
        onPressThumbnail={openLink}
        domain={post.domain}
        showDomain={
          (post.post_hint === "link" && post.domain !== "i.imgur.com") ||
          (post.post_hint === "rich:video" && post.domain === "youtu.be")
        }
      />
      <Awards awards={post.all_awardings} />
      <FlairList
        tag={post.link_flair_text}
        bgColor={post.link_flair_background_color}
        color={post.link_flair_text_color}
        hint={post.post_hint}
        isNsfw={post.over_18}
      />
      <CardMain
        selftext={post.selftext}
        hint={post.post_hint}
        preview={post.preview}
        media={post.media}
        isGallery={post.is_gallery}
        mediaMetadata={post.media_metadata}
        galleryData={post.gallery_data}
        isVideo={post.is_video}
        url={post.url}
        openLink={openLink}
        fullText={fullText}
        isNsfw={post.over_18}
      />
      <CardFooter />
    </View>
  );
};

const makeStyles = (theme: any) =>
  StyleSheet.create({
    card: {
      width: "100%",
      marginVertical: 6,
      elevation: 2,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.1,
      borderRadius: 20,
      overflow: "hidden",
      backgroundColor: theme.surface,
      shadowColor: theme.backdrop,
    },
  });
