import { Message } from "@/features/messages";
import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const arr = [1, 1, 1, 1, 1, 1, 1];

export const InboxScreen = () => {
  return <FlatList data={arr} renderItem={() => <Message />} />;
};
