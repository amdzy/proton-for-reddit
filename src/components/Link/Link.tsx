import React, { ReactNode } from "react";
import { Pressable, Text } from "react-native";

interface Props {
  children: ReactNode;
}

export const Link = ({ children }: Props) => {
  return <Pressable>{children}</Pressable>;
};
