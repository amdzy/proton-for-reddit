import { useTheme } from "@/hooks";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Thumbnail } from "../Thumbnail/Thumbnail";

interface Props {
  title: string;
  thumbnail: string;
  showThumbnail: boolean;
  domain: string;
}

export const CardTitle = ({
  title,
  thumbnail,
  showThumbnail,
  domain,
}: Props) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: theme.text,
            fontSize: 18,
            lineHeight: 22,
          }}
        >
          {title}
        </Text>
        {showThumbnail && (
          <Text style={{ color: theme.placeholder }}>{domain}</Text>
        )}
      </View>

      {showThumbnail && <Thumbnail url={thumbnail} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
