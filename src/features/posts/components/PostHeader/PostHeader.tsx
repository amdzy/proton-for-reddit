import { Avatar, SubText } from "@/components";
import { useTheme } from "@/hooks";
import { useSubIconStore } from "@/stores";
import { Link } from "@react-navigation/native";
import React, { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
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
  const styles = useMemo(() => makeStyles(theme), [theme]);

  useEffect(() => {
    if (!subIcon) {
      fetchIcon(sub);
    }
  }, [subIcon]);

  return (
    <View style={styles.container}>
      <Avatar
        size={24}
        style={styles.avatar}
        image={subIcon}
        showPlaceholder={false}
      />
      <Link to={{ screen: "Sub" }} style={styles.subName}>
        {subName}
      </Link>
      <Link to={{ screen: "Profile" }} style={styles.userName}>
        u/{author}
      </Link>
      <SubText fontSize={12}>{createdAt}</SubText>
    </View>
  );
};

const makeStyles = (theme: any) =>
  StyleSheet.create({
    container: { flexDirection: "row", alignItems: "center", padding: 10 },
    avatar: {
      marginRight: 8,
    },
    subName: { color: theme.highlight, marginRight: 8 },
    userName: { color: theme.placeholder, fontSize: 12, marginRight: 4 },
  });
