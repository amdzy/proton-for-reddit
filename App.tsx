import { RootNavigator } from "@/navigators";
import { useThemeStore } from "@/stores/themeStore";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function App() {
  const chosenTheme = useThemeStore((state) => state.theme);
  const statusBarStyle = useThemeStore(
    (state) => state.colors[chosenTheme].statusBar
  );
  return (
    <>
      <StatusBar style={statusBarStyle} translucent={true} />
      <RootNavigator />
    </>
  );
}
