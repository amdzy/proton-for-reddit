import React from 'react';
import { FlatList } from 'react-native';
import { Message } from '@/features/messages';

const arr = [1, 1, 1, 1, 1, 1, 1];

export function InboxScreen() {
  return <FlatList data={arr} renderItem={() => <Message />} />;
}
