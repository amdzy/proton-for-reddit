import React, { ReactNode } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Spacer } from "../Spacer/Spacer";
import { useTheme } from "@/hooks";

interface Props extends PressableProps {
  text: string;
  subText?: string;
  icon?: any;
  right?: ReactNode;
  left?: ReactNode;
}

export const ListItem = ({
  text,
  subText,
  icon,
  right,
  left,
  disabled,
  ...props
}: Props) => {
  const theme = useTheme();
  return (
    <Pressable
      style={styles.button}
      android_ripple={{ color: theme.placeholder }}
      disabled={disabled}
      {...props}
    >
      <View style={styles.leftContainer}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={theme.placeholder}
          />
        )}
        {left && left}
        <Spacer size={icon || left ? 35 : 58} horizontal />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: disabled ? theme.placeholder : theme.text,
              fontSize: 16,
            }}
          >
            {text}
          </Text>
          {subText && (
            <Text
              style={{
                color: theme.placeholder,
                fontSize: 15,
              }}
            >
              {subText}
            </Text>
          )}
        </View>
      </View>
      {right && right}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    justifyContent: "space-between",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
});
