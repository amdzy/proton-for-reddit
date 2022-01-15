import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { IconButton } from '@/components';
import { useTheme } from '@/hooks';

export function SearchBar() {
  const theme = useTheme();
  const [value, setValue] = useState('');
  const inputRef = useRef<TextInput>(null!);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <View style={styles.container}>
      <TextInput
        style={{
          color: theme.text,
          fontSize: 16,
          flex: 5,
          flexShrink: 1,
        }}
        placeholder="Search anything"
        placeholderTextColor={theme.text}
        autoCapitalize="none"
        value={value}
        onChangeText={setValue}
        ref={inputRef}
      />
      {value.length > 0 && (
        <IconButton
          icon="close"
          style={styles.icon}
          onPress={() => setValue('')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: -20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    maxWidth: '100%',
  },
  icon: { flex: 1, flexShrink: 1 },
});
