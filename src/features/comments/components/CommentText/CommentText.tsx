import React from 'react';
import { Text } from '@/components';

interface Props {
  text: string;
}

export function CommentText({ text }: Props) {
  return <Text style={{ lineHeight: 18 }}>{text}</Text>;
}
