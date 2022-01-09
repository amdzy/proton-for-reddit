import { useThemeStore } from "@/stores/themeStore";
import { ColorsDTO, ThemeName } from "@/stores/types";
import React, { useMemo } from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props extends PressableProps {
  theme: ThemeName;
  active: boolean;
}

export const ThemeButton = ({ theme, active, ...props }: Props) => {
  const setTheme = useThemeStore((state) => state.setTheme);
  const colors = useThemeStore((state) => state.colors[theme]);
  const styles = useMemo(() => makeStyles(colors, active), [colors, active]);

  return (
    <Pressable
      style={styles.container}
      onPress={() => setTheme(theme)}
      {...props}
      testID="ThemeButton"
    >
      <View style={styles.box} />
      <View style={styles.box} />
      <Text style={styles.text}>{theme}</Text>
    </Pressable>
  );
};

const makeStyles = (colors: ColorsDTO, active: boolean) =>
  StyleSheet.create({
    container: {
      padding: 10,
      width: 80,
      borderWidth: 1,
      borderRadius: 5,
      marginHorizontal: 12,
      borderColor: active ? colors.primary : colors.placeholder,
      backgroundColor: colors.background,
    },
    box: {
      width: "100%",
      height: 20,
      marginBottom: 6,
      backgroundColor: colors.surface,
    },
    text: {
      textAlign: "center",
      textTransform: "capitalize",
      color: colors.text,
    },
  });
