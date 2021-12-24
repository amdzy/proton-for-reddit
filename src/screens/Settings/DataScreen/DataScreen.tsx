import { Checkbox, Divider, ListItem, SettingsHeader } from "@/components";
import { useTheme } from "@/hooks";
import { useSettingsStore } from "@/stores";
import React from "react";
import { View } from "react-native";
import shallow from "zustand/shallow";

export const DataScreen = () => {
  const theme = useTheme();
  const { dataSaver, setDataSaver } = useSettingsStore(
    (state) => ({
      dataSaver: state.dataSaver,
      setDataSaver: state.setDataSaver,
    }),
    shallow
  );
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <SettingsHeader text="Data Saver" />
      <ListItem
        text="Data Saver"
        subText="Load lower-sized media"
        onPress={setDataSaver}
        right={<Checkbox checked={dataSaver} passThrough />}
      />
      <Divider />
      <SettingsHeader text="Videos" />
      <ListItem text="Autoplay videos" subText="Never" />
      <ListItem text="Video quality" subText="Prefer lower size" />
      <Divider />
      <SettingsHeader text="Images" />
      <ListItem text="Load Images" subText="Enabled" />
    </View>
  );
};
