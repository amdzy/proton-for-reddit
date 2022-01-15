import React, { useMemo, useState } from 'react';
import {
  FlatList, StyleSheet, TextInput, View,
} from 'react-native';
import {
  Button,
  CustomModal,
  Divider,
  IconButton,
  SettingsHeader,
} from '@/components';
import { useTheme } from '@/hooks';
import { useFilterStore } from '@/stores';
import { ColorsDTO } from '@/stores/types';
import { FilterListItem } from './components/FiltersListItem';

interface Props {
  visible: boolean;
  type: 'subs' | 'users' | 'flairs' | 'keywords';
  onClose: () => void;
}

export function FilterModal({ visible, type, onClose }: Props) {
  const theme = useTheme();
  const filters = useFilterStore((state) => state[type]);
  const addFilter = useFilterStore((state) => state.addFilter);
  const removeFilter = useFilterStore((state) => state.removeFilter);
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value === '') return;
    if (filters.includes(value)) return;
    addFilter(type, value);
    setValue('');
  };

  const submitAndClose = () => {
    handleSubmit();
    onClose();
  };

  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <CustomModal visible={visible} onClose={onClose}>
      <View style={styles.titleContainer}>
        <SettingsHeader text={type} style={styles.title} />
        <Divider />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add filter here"
          placeholderTextColor={theme.placeholder}
          autoCapitalize="none"
          value={value}
          onChangeText={setValue}
          onSubmitEditing={handleSubmit}
          testID="input"
        />
        <IconButton icon="plus" style={styles.icon} onPress={handleSubmit} />
      </View>
      <FlatList
        keyExtractor={(item) => item}
        data={filters}
        renderItem={({ item }) => (
          <FilterListItem
            text={item}
            onPress={() => removeFilter(type, item)}
          />
        )}
      />
      <View style={styles.buttonsContainer}>
        <Button text="Cancel" onPress={onClose} />
        <Button text="Done" onPress={submitAndClose} />
      </View>
    </CustomModal>
  );
}

const makeStyles = (theme: ColorsDTO) => StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    textAlign: 'center',
    textTransform: 'capitalize',
    paddingTop: 0,
  },
  inputContainer: {
    padding: 20,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: theme.text,
    borderBottomWidth: 1,
    borderColor: theme.primary,
    fontSize: 16,
    flex: 1,
    maxWidth: '90%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
  },
  icon: { marginLeft: 12 },
});
