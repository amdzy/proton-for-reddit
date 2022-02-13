import React from 'react';
import { Image } from 'react-native';
import { SubText } from '@/components';
import { useSettingsStore } from '@/stores';

interface Props {
  type: string;
  text: string | null;
  richText: Array<{ u: string; t?: string }> | [];
}

export function CommentFlairs({ type, text, richText }: Props) {
  const showFlairs = useSettingsStore((state) => state.comments.flairs);

  if (!showFlairs) {
    return null;
  }

  if (type === 'text' && text) {
    return <SubText>{text}</SubText>;
  }

  if (type === 'richtext' && richText.length > 0) {
    return (
      <>
        {richText.map((item) => {
          if (item.t) {
            return <SubText key={item.t}>{item.t}</SubText>;
          }
          if (item.u) {
            return (
              <Image
                key={item.u}
                source={{ uri: item.u }}
                style={{ width: 16, height: 14 }}
              />
            );
          }
          return null;
        })}
      </>
    );
  }

  return null;
}
