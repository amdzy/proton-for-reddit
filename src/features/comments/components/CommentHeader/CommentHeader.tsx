import React from 'react';
import { View } from 'react-native';
import { Avatar, HighlightedText, SubText } from '@/components';
import { timeRelative } from '@/utils';

interface Props {
  author: string;
  score: number;
  date: number;
}

export function CommentHeader({ author, score, date }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 4,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Avatar
          image={undefined}
          size={18}
          placeholder="user"
          style={{ marginRight: 6 }}
        />
        <HighlightedText style={{ marginRight: 6 }}>{author}</HighlightedText>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <SubText fontSize={15} style={{ marginRight: 6 }}>
          {score}
        </SubText>
        <SubText fontSize={12}>{timeRelative(date)}</SubText>
      </View>
    </View>
  );
}
