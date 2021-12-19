import { Avatar, Stack } from "@/components";
import { useThemeStore } from "@/stores/themeStore";
import { Link } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { Flair } from "../Flair/Flair";

export const CardHeader = () => {
  const chosenTheme = useThemeStore((state) => state.theme);
  const theme = useThemeStore((state) => state.colors[chosenTheme]);
  return (
    <Stack space={4} style={{ padding: 10 }}>
      <Stack
        space={8}
        direction="row"
        spaceHorizontal={true}
        style={{ alignItems: "center" }}
      >
        <Avatar
          image={
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.QDOmzOh-mruIm3MlC7aezgHaE8%26pid%3DApi&f=1"
          }
          size={24}
        />
        <Link to={{ screen: "Sub" }} style={{ color: theme.highlight }}>
          Subreddit
        </Link>
        <Link
          to={{ screen: "Profile" }}
          style={{ color: theme.placeholder, fontSize: 12 }}
        >
          . User Name
        </Link>
        <Text style={{ color: theme.placeholder, fontSize: 12 }}>. 1h</Text>
      </Stack>
      <View>
        <Text style={{ color: theme.text, fontSize: 18, lineHeight: 22 }}>
          Many endpoints on reddit use the same protocol for controlling
          pagination and filtering.
        </Text>
      </View>
      <Stack space={8} direction="row" spaceHorizontal={true}>
        <Flair tag="General" />
      </Stack>
      <Stack space={8} direction="row" spaceHorizontal={true}>
        <Text style={{ color: theme.placeholder }}>2430</Text>
        <Text style={{ color: theme.placeholder }}>-</Text>
        <Text style={{ color: theme.placeholder }}>100 Comments</Text>
      </Stack>
    </Stack>
  );
};
