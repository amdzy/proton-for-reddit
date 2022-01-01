import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useTheme } from "@/hooks";
import { hexToRgb } from "../utils/hexToRgb";
import { rgbToHex } from "../utils/rgbToHex";
import { CustomModal, Button } from "@/components";

interface Props {
  isOpen: boolean;
  color: string;
  onClose: () => void;
  onSubmit: (val: string) => void;
}

const nonHexChar = new RegExp("[g-z\\W\\s]", "gi");

export const ColorPicker = ({ isOpen, color, onClose, onSubmit }: Props) => {
  color = color.replace("#", "").toUpperCase();
  const theme = useTheme();
  const [colorValue, setColorValue] = useState(color);
  const [rgbValue, setRgbValue] = useState({ red: 0, green: 0, blue: 0 });
  const [inputValue, setInputValue] = useState(color);

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
    value = value.replace(nonHexChar, "");
    setInputValue(value);
    if (value.length === 6) {
      setColorValue(value);
      try {
        setRgbValue(hexToRgb(value));
      } catch {
        return;
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setColorValue(color);
      setInputValue(color);
      try {
        setRgbValue(hexToRgb(color));
      } catch {
        return;
      }
    }
  }, [isOpen]);

  return (
    <CustomModal onClose={onClose} visible={isOpen}>
      <View style={{ paddingHorizontal: 35 }}>
        <Text
          style={{
            fontSize: 18,
            marginBottom: 8,
            fontWeight: "bold",
            color: theme.text,
          }}
        >
          Customize
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            width: "100%",
            height: 120,
            backgroundColor: `#${colorValue}`,
            marginVertical: 18,
          }}
        ></View>
        <View style={styles.inputContainer}>
          <Text style={{ color: theme.text, fontSize: 16 }}>#</Text>
          <TextInput
            style={{
              color: theme.text,
              fontSize: 18,
              borderBottomWidth: 2,
              borderColor: theme.primary,
            }}
            autoCapitalize="characters"
            placeholder={color}
            placeholderTextColor={theme.placeholder}
            value={inputValue}
            onChangeText={handleInputChange}
            maxLength={6}
          />
        </View>
        {sliders.map((x) => {
          return (
            <View style={styles.sliderContainer} key={x.text}>
              <Text style={{ color: theme.text }}>{x.text}</Text>
              <Slider
                step={1}
                maximumValue={255}
                style={{ flex: 1, paddingHorizontal: 8 }}
                value={rgbValue[x.value]}
                onValueChange={(value) => handleSliderChange(value, x.value)}
                minimumTrackTintColor={theme.primary}
                maximumTrackTintColor={theme.placeholder}
                thumbTintColor={theme.primary}
              />
              <Text style={{ color: theme.text }}>{rgbValue[x.value]}</Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Button text="Cancel" onPress={onClose} />
        <Button text="Done" onPress={() => onSubmit(`#${colorValue}`)} />
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 8,
  },
});

const sliders = [
  {
    text: "R",
    value: "red",
  },
  {
    text: "G",
    value: "green",
  },
  {
    text: "B",
    value: "blue",
  },
] as const;
