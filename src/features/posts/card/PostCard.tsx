import { useThemeStore } from "@/stores/themeStore";
import React from "react";
import { StyleSheet, View } from "react-native";
import { CardFooter } from "../components/CardFooter/CardFooter";
import { CardHeader } from "../components/CardHeader/CardHeader";
import { CardMain } from "../components/CardMain/CardMain";

export const PostCard = () => {
  const chosenTheme = useThemeStore((state) => state.theme);
  const theme = useThemeStore((state) => state.colors[chosenTheme]);
  return (
    <View
      style={{
        backgroundColor: theme.surface,
        width: "100%",
        marginVertical: 6,
      }}
    >
      <CardHeader />
      <CardMain />
      <CardFooter />
    </View>
  );
};

const styles = StyleSheet.create({});
