import { useTheme } from "@/hooks";
import { RootNavigator } from "@/navigators";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";

export default function App() {
  const theme = useTheme();
  return (
    <>
      <StatusBar style={theme.statusBar} translucent={true} />
      <RootNavigator />
    </>
  );
}
