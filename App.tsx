import { useTheme } from "@/hooks";
import { queryClient } from "@/lib/react-query";
import { RootNavigator } from "@/navigators";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { QueryClientProvider } from "react-query";

export default function App() {
  const theme = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style={theme.statusBar} translucent={true} />
      <RootNavigator />
    </QueryClientProvider>
  );
}
