import { Text } from "@/components";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks";

interface Props {
  width: number;
  height: number;
  url: string;
}

export const PostImage = ({ url, width, height }: Props) => {
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const styles = useMemo(() => makeStyles(width, height), []);
  const theme = useTheme();

  if (isError) {
    return (
      <Pressable style={styles.centeredBox} onPress={() => setIsError(false)}>
        <View>
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color={theme.text}
            style={{ textAlign: "center" }}
          />
          <Text>An error happened click to reload</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.box}>
      <Image
        source={{
          uri: url,
        }}
        style={styles.box}
        resizeMode="cover"
        testID="PostImage"
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => setIsError(true)}
      />
      <View style={styles.absoluteBox}>
        <ActivityIndicator
          animating={isloading}
          color={theme.primary}
          size="large"
        />
      </View>
    </View>
  );
};

const makeStyles = (width: number, height: number) =>
  StyleSheet.create({
    box: {
      flex: 1,
      width: "100%",
      height: undefined,
      aspectRatio: width / height || 1,
    },
    centeredBox: {
      flex: 1,
      width: "100%",
      height: undefined,
      aspectRatio: width / height || 1,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    absoluteBox: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });
