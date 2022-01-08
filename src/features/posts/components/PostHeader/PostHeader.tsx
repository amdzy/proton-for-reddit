import { Avatar } from "@/components";
import { useTheme } from "@/hooks";
import { Link } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  subName: string;
  author: string;
  createdAt: number;
  sub: string;
}

export const PostHeader = ({ subName, author, createdAt, sub }: Props) => {
  const theme = useTheme();
  const [subIcon, setSubIcon] = useState("");

  useEffect(() => {
    if (!subIcon) {
      fetch(`https://www.reddit.com/r/${sub}/about.json`).then((res) =>
        res.json().then((data) => {
          console.log(data);

          setSubIcon(data.data.icon_img);
        })
      );
    }
  }, []);
  return (
    <View style={styles.container}>
      <Avatar size={24} style={{ marginRight: 8 }} image={subIcon} />
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
