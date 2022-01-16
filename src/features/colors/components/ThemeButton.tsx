import React, { useMemo } from 'react';
import { Pressable, PressableProps, StyleSheet, View } from 'react-native';
import { useThemeStore } from '@/stores/themeStore';
import { ColorsDTO, ThemeName } from '@/stores/types';
import { Divider, Icon, Text } from '@/components';

interface Props extends PressableProps {
  theme: ThemeName;
  active: boolean;
}

export function ThemeButton({ theme, active, disabled }: Props) {
  const setTheme = useThemeStore((state) => state.setTheme);
  const colors = useThemeStore((state) => state.colors[theme]);
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <Pressable
      onPress={() => setTheme(theme)}
      disabled={disabled}
      testID="ThemeButton"
    >
      <View
        style={[styles.container, active && styles.activeContainer]}
        testID="boxes"
      >
        <View style={{ paddingVertical: 6, paddingHorizontal: 10 }}>
          <View style={styles.topBox} />
          <Divider />
          <View style={styles.bigBox} />
          <View style={styles.row}>
            <View style={styles.topBox} />
            <View style={styles.primaryColorBox} />
          </View>
          <View style={styles.row}>
            <View style={styles.placeholderColorBox} />
            <View style={[styles.placeholderColorBox, { marginLeft: 6 }]} />
          </View>
          <View style={{ height: 20 }} />
        </View>
        <View style={styles.toolbarBox}>
          <View style={[styles.circle, styles.inactiveCircle]} />
          <View style={[styles.circle, styles.activeCirce]} />
          <View style={[styles.circle, styles.inactiveCircle]} />
        </View>
        {active && (
          <View style={styles.icon}>
            <Icon icon="check" size={16} color="white" />
          </View>
        )}
      </View>
      <Text style={styles.text}>{theme}</Text>
    </Pressable>
  );
}

const makeStyles = (colors: ColorsDTO) =>
  StyleSheet.create({
    container: {
      width: 100,
      marginHorizontal: 6,
      backgroundColor: colors.background,
      borderRadius: 20,
      borderWidth: 4,
      overflow: 'hidden',
    },
    activeContainer: {
      borderColor: colors.primary,
    },
    bigBox: {
      width: '100%',
      height: 18,
      marginVertical: 6,
      backgroundColor: colors.surface,
      borderRadius: 5,
    },
    topBox: {
      width: '50%',
      height: 8,
      marginBottom: 6,
      backgroundColor: colors.text,
      borderRadius: 8,
    },
    primaryColorBox: {
      width: '30%',
      height: 8,
      marginBottom: 6,
      backgroundColor: colors.primary,
      borderRadius: 8,
      marginLeft: 6,
    },
    placeholderColorBox: {
      width: '40%',
      height: 8,
      marginBottom: 6,
      backgroundColor: colors.placeholder,
      borderRadius: 8,
    },
    toolbarBox: {
      padding: 8,
      backgroundColor: colors.toolbar,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    circle: {
      padding: 6,
      borderRadius: 8,
    },
    inactiveCircle: {
      backgroundColor: colors.placeholder,
    },
    activeCirce: {
      backgroundColor: colors.primary,
    },
    text: {
      textAlign: 'center',
      textTransform: 'capitalize',
      marginTop: 6,
      fontSize: 16,
    },
    icon: {
      borderRadius: 15,
      borderColor: 'white',
      borderWidth: 2,
      backgroundColor: colors.primary,
      position: 'absolute',
      right: 5,
      top: 5,
    },
    row: { flexDirection: 'row' },
  });
