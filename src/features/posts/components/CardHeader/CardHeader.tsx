import { Avatar, Stack } from "@/components";
import { useTheme } from "@/hooks";
import { useThemeStore } from "@/stores/themeStore";
import { Link } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { Flair } from "../Flair/Flair";

export const CardHeader = ({ post }: any) => {
  const theme = useTheme();
  const fonts = useThemeStore((state) => state.fonts);
  return (
    <Stack space={5} style={{ padding: 10 }}>
      <Stack
        space={8}
        direction="row"
        spaceHorizontal={true}
        style={{ alignItems: "center" }}
      >
        <Avatar size={24} />
        <Link to={{ screen: "Sub" }} style={{ color: theme.highlight }}>
          {post.subreddit_name_prefixed}
        </Link>
        <Link
          to={{ screen: "Profile" }}
          style={{ color: theme.placeholder, fontSize: 12 }}
        >
          u/{post.author}
        </Link>
        <Text style={{ color: theme.placeholder, fontSize: 12 }}>
          {post.created_utc}
        </Text>
      </Stack>
      <View style={{ paddingVertical: 4 }}>
        <Text
          style={{
            color: theme.text,
            fontSize: fonts.fontSize.header,
            lineHeight: 22,
          }}
        >
          {post.title}
        </Text>
      </View>
      <Stack direction="row">
        <Flair
          tag={post.link_flair_text}
          bgColor={post.link_flair_background_color}
          color={post.link_flair_text_color}
        />
        {post.post_hint === "link" && (
          <Flair tag="Link" bgColor={theme.highlight} color={"dark"} />
        )}
      </Stack>
      <Stack space={8} direction="row" spaceHorizontal={true}>
        <Text style={{ color: theme.placeholder }}>{post.ups}</Text>
        <Text style={{ color: theme.placeholder }}>-</Text>
        <Text style={{ color: theme.placeholder }}>
          {post.num_comments} Comments
        </Text>
      </Stack>
      {post.post_hint === "link" && (
        <Text style={{ color: theme.placeholder }}>{post.domain}</Text>
      )}
    </Stack>
  );
};
