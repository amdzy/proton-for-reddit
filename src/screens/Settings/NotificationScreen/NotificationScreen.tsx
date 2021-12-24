import { Checkbox, CustomModal, ListItem, RadioButton } from "@/components";
import { useTheme } from "@/hooks";
import { useSettingsStore } from "@/stores";
import React, { useState } from "react";
import { FlatList, View } from "react-native";

export const NotificationScreen = () => {
  const theme = useTheme();
  const notifications = useSettingsStore((state) => state.notifications);
  const setNotifications = useSettingsStore((state) => state.setNotifications);
  const setInterval = useSettingsStore(
    (state) => state.setNotificationsInterval
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (text: string, value: number) => {
    setInterval(text, value);
    setIsModalOpen(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ListItem
        text="Check Notifications"
        icon="email"
        onPress={setNotifications}
        right={<Checkbox checked={notifications.enabled} passThrough />}
      />
      <ListItem
        text="Check Interval"
        subText={notifications.interval.text}
        icon="refresh"
        onPress={() => setIsModalOpen(true)}
        disabled={!notifications.enabled}
      />
      <CustomModal visible={isModalOpen} onClose={handleCloseModal}>
        <FlatList
          style={{ paddingBottom: 10 }}
          keyExtractor={(item) => item.text}
          data={intervals}
          renderItem={({ item }) => {
            return (
              <ListItem
                text={item.text}
                onPress={() => {
                  handleSubmit(item.text, item.value);
                }}
                left={
                  <RadioButton
                    checked={notifications.interval.text === item.text}
                    passThrough
                  />
                }
              />
            );
          }}
        />
      </CustomModal>
    </View>
  );
};

const intervals = [
  {
    text: "15 Minute",
    value: 3123,
  },
  {
    text: "30 Minute",
    value: 3123,
  },
  {
    text: "1 Hour",
    value: 3123,
  },
  {
    text: "2 Hour",
    value: 3123,
  },
  {
    text: "4 Hour",
    value: 3123,
  },
  {
    text: "8 Hour",
    value: 3123,
  },
  {
    text: "12 Hour",
    value: 3123,
  },
  {
    text: "24 Hour",
    value: 3123,
  },
];
