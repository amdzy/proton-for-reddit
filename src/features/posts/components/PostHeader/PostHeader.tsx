import { Avatar } from "@/components";
import { useTheme } from "@/hooks";
import { useSubIconStore } from "@/stores";
import { Link } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { fetchIcon } from "../../utils/fetchIcon";

interface Props {
  subName: string;
  author: string;
  createdAt: number;
  sub: string;
}

export const PostHeader = ({ subName, author, createdAt, sub }: Props) => {
  const theme = useTheme();
  const subIcon = useSubIconStore((state) => state.icons.get(sub));

  useEffect(() => {
    if (!subIcon) {
      fetchIcon(sub);
    }
  }, [subIcon]);

  return (
    <View style={styles.container}>
      <Avatar
        size={24}
        style={{ marginRight: 8 }}
        image={subIcon}
        showPlaceholder={false}
      />
      <Link
        to={{ screen: "Sub" }}
        style={{ color: theme.highlight, marginRight: 8 }}
      >
        {subName}
      </Link>
      <Link
        to={{ screen: "Profile" }}
        style={{ color: theme.placeholder, fontSize: 12, marginRight: 4 }}
      >
        u/{author}
      </Link>
      <Text style={{ color: theme.placeholder, fontSize: 12 }}>
        {createdAt}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", padding: 10 },
});
