import { Image } from "react-native";

interface Props {
  width: number;
  height: number;
  url: string;
}

export const PostImage = ({ url, width, height }: Props) => {
  return (
    <Image
      source={{
        uri: url,
      }}
      style={{
        flex: 1,
        width: "100%",
        height: undefined,
        aspectRatio: width / height || 1,
      }}
      resizeMode="cover"
      testID="PostImage"
    />
  );
};
