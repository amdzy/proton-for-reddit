import { RootNavigator } from "@/navigators";
import { useThemeStore } from "@/stores/themeStore";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function App() {
  const statusBarStyle = useThemeStore((state) => state.statusBar);
  return (
    <>
      <StatusBar style={statusBarStyle} translucent={true} />
      <RootNavigator />
    </>
  );
}
