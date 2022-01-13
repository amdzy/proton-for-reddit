import { Avatar, SubText } from "@/components";
import { useTheme } from "@/hooks";
import { useSubIconStore } from "@/stores";
import { Link } from "@react-navigation/native";
import React, { useEffect, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { fetchIcon } from "../../utils/fetchIcon";
import { formatDistanceToNowStrict } from "date-fns";

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
      <Pressable>
        <Avatar
          size={26}
          style={styles.avatar}
          image={subIcon}
          showPlaceholder={false}
        />
      </Pressable>
      <View style={styles.linksContainer}>
        <Pressable>
          <Text style={styles.subName}>{subName}</Text>
        </Pressable>
        <View style={styles.subContainer}>
          <Pressable>
            <SubText fontSize={12} style={styles.userName}>
              u/{author}
            </SubText>
          </Pressable>
          <SubText fontSize={12}>
            {formatDistanceToNowStrict(createdAt * 1000)} ago
          </SubText>
        </View>
      </View>
    </View>
  );
};

const makeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      flex: 1,
      paddingBottom: 4,
    },
    avatar: {
      marginRight: 8,
    },
    subName: { color: theme.highlight, marginRight: 8 },
    userName: { marginRight: 8 },
    linksContainer: { flex: 1, marginLeft: 6 },
    subContainer: { flex: 1, flexDirection: "row", alignItems: "center" },
  });
