import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme } from '@/hooks';
import { hexToRgb } from '../utils/hexToRgb';
import { rgbToHex } from '../utils/rgbToHex';
import { CustomModal, Button } from '@/components';
import { ColorsDTO } from '@/stores/types';

interface Props {
  isOpen: boolean;
  color: string;
  onClose: () => void;
  onSubmit: (val: string) => void;
}

const nonHexChar = /[g-z\W\s]/gi;

export function ColorPicker({ isOpen, color, onClose, onSubmit }: Props) {
  const colorUpper = color.replace('#', '').toUpperCase();
  const theme = useTheme();
  const [colorValue, setColorValue] = useState(colorUpper);
  const [rgbValue, setRgbValue] = useState({ red: 0, green: 0, blue: 0 });
  const [inputValue, setInputValue] = useState(colorUpper);

  const styles = useMemo(() => makeStyles(theme), [theme]);

  const handleSliderChange = (value: number, type: string) => {
    const colors = {
      ...rgbValue,
      [type]: value,
    };
    setRgbValue(colors);
    const hex = rgbToHex(colors.red, colors.green, colors.blue).toUpperCase();
    setColorValue(hex);
    setInputValue(hex);
  };

  const handleInputChange = (value: string) => {
    const newValue = value.replace(nonHexChar, '');
    setInputValue(newValue);
    if (newValue.length === 6) {
      setColorValue(newValue);
      try {
        setRgbValue(hexToRgb(newValue));
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setColorValue(colorUpper);
      setInputValue(colorUpper);
      try {
        setRgbValue(hexToRgb(colorUpper));
      } catch (err) {
        console.log(err);
      }
    }
  }, [isOpen, colorUpper]);

  return (
    <CustomModal onClose={onClose} visible={isOpen}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Customize</Text>
      </View>
      <ScrollView>
        <View
          style={{
            backgroundColor: `#${colorValue}`,
            ...styles.previewBox,
          }}
          testID="previewBox"
        />
        <View style={styles.inputContainer}>
          <Text style={styles.inputHash}>#</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="characters"
            placeholder={colorUpper}
            placeholderTextColor={theme.placeholder}
            value={inputValue}
            onChangeText={handleInputChange}
            maxLength={6}
            testID="colorInput"
          />
        </View>
        {sliders.map((x) => (
          <View style={styles.sliderContainer} key={x.text}>
            <Text style={{ color: theme.text }}>{x.text}</Text>
            <Slider
              step={1}
              maximumValue={255}
              style={styles.slider}
              value={rgbValue[x.value]}
              onValueChange={(value) => handleSliderChange(value, x.value)}
              minimumTrackTintColor={theme.primary}
              maximumTrackTintColor={theme.placeholder}
              thumbTintColor={theme.primary}
              testID="slider"
            />
            <Text style={{ color: theme.text }}>{rgbValue[x.value]}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Button text="Cancel" onPress={onClose} />
        <Button text="Done" onPress={() => onSubmit(`#${colorValue}`)} />
      </View>
    </CustomModal>
  );
}

const makeStyles = (theme: ColorsDTO) =>
  StyleSheet.create({
    headerContainer: { paddingHorizontal: 35 },
    header: {
      fontSize: 18,
      marginBottom: 8,
      fontWeight: 'bold',
      color: theme.text,
    },
    previewBox: {
      width: '100%',
      height: 120,
      marginVertical: 18,
    },
    inputContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      paddingBottom: 8,
    },
    input: {
      color: theme.text,
      fontSize: 18,
      borderBottomWidth: 2,
      borderColor: theme.primary,
    },
    inputHash: { color: theme.text, fontSize: 16 },
    sliderContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    slider: { flex: 1, paddingHorizontal: 8 },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 14,
    },
  });

const sliders = [
  {
    text: 'R',
    value: 'red',
  },
  {
    text: 'G',
    value: 'green',
  },
  {
    text: 'B',
    value: 'blue',
  },
] as const;
