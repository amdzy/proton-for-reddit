import { Spinner, Text } from "@/components";
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
  resizeMode?: "cover" | "contain" | "stretch";
  onPress?: () => void;
}

export const PostImage = ({
  url,
  width,
  height,
  resizeMode = "cover",
  onPress,
}: Props) => {
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
            style={styles.icon}
          />
          <Text>An error happened click to reload</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable style={styles.box} onPress={onPress}>
      <Image
        source={{
          uri: url,
        }}
        style={styles.box}
        resizeMode={resizeMode}
        testID="PostImage"
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => setIsError(true)}
      />
      <Spinner animating={isloading} />
    </Pressable>
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

    icon: {
      textAlign: "center",
    },
  });
