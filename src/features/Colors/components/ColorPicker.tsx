import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useTheme } from "@/hooks";
import { hexToRgb } from "../utils/hexToRgb";
import { rgbToHex } from "../utils/rgbToHex";

interface Props {
  isOpen: boolean;
  color: string;
  onClose: () => void;
  onSubmit: (val: string) => void;
}

export const ColorPicker = ({ isOpen, color, onClose, onSubmit }: Props) => {
  const theme = useTheme();
  const [ColorValue, setColorValue] = useState(color);
  const [rgbValue, setRgbValue] = useState({ red: 0, green: 0, blue: 0 });

  const handleChange = (value: number, type: string) => {
    setRgbValue((old) => ({ ...old, [type]: value }));
    const hex = rgbToHex(rgbValue.red, rgbValue.green, rgbValue.blue);
    setColorValue(`#${hex}`);
  };

  useEffect(() => {
    if (isOpen) {
      const rgb = hexToRgb(color);
      setColorValue(color);
      setRgbValue(rgb);
    }
  }, [isOpen]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={[styles.modalView, { backgroundColor: theme.surface }]}>
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
                backgroundColor: ColorValue,
                marginVertical: 18,
              }}
            ></View>

            <Text
              style={{
                color: theme.text,
                textAlign: "center",
                marginVertical: 8,
                textTransform: "uppercase",
                fontSize: 16,
              }}
            >
              {ColorValue}
            </Text>
            {sliders.map((x) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                  key={x.text}
                >
                  <Text style={{ color: theme.text }}>{x.text}</Text>
                  <Slider
                    step={1}
                    maximumValue={255}
                    style={{ flex: 1, paddingHorizontal: 8 }}
                    value={rgbValue[x.value]}
                    onValueChange={(value) => handleChange(value, x.value)}
                    minimumTrackTintColor={theme.primary}
                    maximumTrackTintColor={theme.placeholder}
                    thumbTintColor={theme.primary}
                  />
                  <Text style={{ color: theme.text }}>{rgbValue[x.value]}</Text>
                </View>
              );
            })}
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 14,
            }}
          >
            <Pressable style={{ padding: 10 }} onPress={onClose}>
              <Text style={{ color: theme.primary }}>Cancel</Text>
            </Pressable>
            <Pressable
              style={{ padding: 10 }}
              onPress={() => onSubmit(ColorValue)}
            >
              <Text style={{ color: theme.primary }}>Done</Text>
            </Pressable>
          </View>
        </View>
        <Pressable
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            width: "100%",
            height: "100%",
            zIndex: 1,
            position: "absolute",
          }}
          onPress={onClose}
        ></Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    maxWidth: 400,
    margin: 20,
    borderRadius: 20,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: "80%",
    zIndex: 2,
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
