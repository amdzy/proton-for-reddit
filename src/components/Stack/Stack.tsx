import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { Spacer } from "../Spacer/Spacer";

interface Props {
  children: ReactNode;
  size?: number;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  spaceHorizontal?: boolean;
  style?: ViewStyle;
}

export const Stack = ({
  children,
  size = 0,
  direction = "column",
  spaceHorizontal = false,
  style,
}: Props) => {
  return (
    <View
      style={{
        flexDirection: direction,
        flexWrap: "wrap",
        ...style,
      }}
    >
      {React.Children.map(children, (child) => {
        return (
          <>
            {child}
            <Spacer size={size} horizontal={spaceHorizontal} />
          </>
        );
      })}
    </View>
  );
};
