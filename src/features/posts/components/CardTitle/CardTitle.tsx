import { Header, SubText } from "@/components";
import React from "react";
import { StyleSheet, View } from "react-native";
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
  return (
    <View style={styles.container} testID="CardTitle">
      <View style={styles.textContainer}>
        <Header>{title}</Header>
        {showThumbnail && <SubText>{domain}</SubText>}
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
  textContainer: {
    flex: 1,
  },
});
