import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import {
  CustomModal,
  Divider,
  HighlightedText,
  RadioButton,
  Text,
} from '@/components';

interface Props {
  visible: boolean;
  qualities: Array<{ quality: string; url: string }>;
  url: string;
  onClose: () => void;
  onPress: (url: string) => void;
}

function seperator() {
  return <Divider />;
}

export function VideoQualityModal({
  visible,
  qualities,
  url,
  onClose,
  onPress,
}: Props) {
  return (
    <CustomModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <HighlightedText style={styles.highlightedText}>
          Select Video Quality
        </HighlightedText>
        <Divider />
        <FlatList
          data={qualities}
          keyExtractor={(item) => item.quality}
          renderItem={({ item }) => (
            <Pressable
              style={styles.button}
              onPress={() => {
                if (url.includes(item.quality)) {
                  onClose();
                  return;
                }
                onPress(item.url);
              }}
            >
              <RadioButton checked={url.includes(item.quality)} />
              <Text style={styles.text}>{item.quality}p</Text>
            </Pressable>
          )}
          ItemSeparatorComponent={seperator}
        />
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 8 },
  highlightedText: { textAlign: 'center', fontSize: 16, paddingBottom: 6 },
  button: {
    padding: 10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: { fontSize: 16, marginLeft: 16 },
});
