import { RootNavigator } from "@/navigators";
import { useColorStore } from "@/stores/colorStore";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function App() {
  const statusBarStyle = useColorStore((state) => state.statusBar);
  return (
    <>
      <StatusBar style={statusBarStyle} translucent={true} />
      <RootNavigator />
    </>
  );
}
