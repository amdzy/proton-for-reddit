import React from 'react';
import { Text } from '@/components';

interface Props {
  text: string;
}

export function CommentText({ text }: Props) {
  return (
    <Text style={{ lineHeight: 18, paddingHorizontal: 14, paddingBottom: 14 }}>
      {text}
    </Text>
  );
}
