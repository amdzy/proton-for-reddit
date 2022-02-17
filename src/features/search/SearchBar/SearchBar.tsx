/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { IconButton } from '@/components';
import { useTheme } from '@/hooks';
import { useSearchStore } from '@/stores';
import { ColorsDTO } from '@/stores/types';

export function SearchBar() {
  const theme = useTheme();
  const inputRef = useRef<TextInput>(null!);
  const searchVal = useSearchStore((state) => state.search);
  const setSearchVal = useSearchStore((state) => state.setSearch);
  const navigation = useNavigation();
  const styles = makeStyles(theme);

  const handleGoBack = () => {
    setSearchVal('');
    navigation.goBack();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        color={theme.text}
        style={styles.arrowIcon}
        onPress={handleGoBack}
      />
      <TextInput
        style={styles.input}
        placeholder="Search anything"
        placeholderTextColor={theme.text}
        autoCapitalize="none"
        value={searchVal}
        onChangeText={setSearchVal}
        ref={inputRef}
      />
      {searchVal.length > 0 && (
        <IconButton
          icon="close"
          style={styles.icon}
          onPress={() => setSearchVal('')}
        />
      )}
    </View>
  );
}

const makeStyles = (theme: ColorsDTO) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
      maxWidth: '100%',
    },
    icon: { marginHorizontal: 24 },
    arrowIcon: { marginRight: 16 },
    input: {
      color: theme.text,
      fontSize: 16,
      flex: 1,
    },
  });
