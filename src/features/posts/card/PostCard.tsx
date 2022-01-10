import { useThemeStore } from "@/stores/themeStore";
import React from "react";
import { StyleSheet, View } from "react-native";
import { CardFooter } from "../components/CardFooter/CardFooter";
import { PostHeader } from "../components/PostHeader/PostHeader";
import { CardMain } from "../components/CardMain/CardMain";
import { FlairList } from "../components/Flair/FlairList";
import { CardTitle } from "../components/CardTitle/CardTitle";

export const PostCard = ({ post }: any) => {
  const chosenTheme = useThemeStore((state) => state.theme);
  const theme = useThemeStore((state) => state.colors[chosenTheme]);

  return (
    <View
      style={{
        backgroundColor: theme.surface,
        shadowColor: theme.backdrop,
        ...styles.card,
      }}
    >
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
        domain={post.domain}
        showDomain={
          (post.post_hint === "link" && post.domain !== "i.imgur.com") ||
          (post.post_hint === "rich:video" && post.domain === "youtu.be")
        }
      />
      <FlairList
        tag={post.link_flair_text}
        bgColor={post.link_flair_background_color}
        color={post.link_flair_text_color}
        hint={post.post_hint}
      />
      <CardMain post={post} />
      <CardFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginVertical: 6,
    elevation: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    borderRadius: 20,
    overflow: "hidden",
  },
});
