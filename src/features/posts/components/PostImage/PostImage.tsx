import { Image } from "react-native";

interface Props {
  image: {
    width: number;
    height: number;
    url: string;
  };
}

export const PostImage = ({ image }: Props) => {
  return (
    <Image
      source={{
        uri: image.url,
      }}
      style={{
        flex: 1,
        width: "100%",
        height: undefined,
        aspectRatio: image.width / image.height || 1,
      }}
      resizeMode="cover"
    />
  );
};
