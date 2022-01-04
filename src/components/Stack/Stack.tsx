import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { Spacer } from "../Spacer/Spacer";

interface Props {
  children: ReactNode;
  space?: number;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  spaceHorizontal?: boolean;
  style?: ViewStyle;
}

export const Stack = ({
  children,
  space = 0,
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
      testID="stack"
    >
      {React.Children.map(children, (child) => {
        return (
          <>
            {child}
            <Spacer size={space} horizontal={spaceHorizontal} />
          </>
        );
      })}
    </View>
  );
};
