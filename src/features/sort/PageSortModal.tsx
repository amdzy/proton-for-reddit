import React from 'react';
import { ScrollView } from 'react-native';
import { CustomModal, ListItem } from '@/components';
import { useSettingsStore } from '@/stores';
import { queryClient } from '@/lib/react-query';

interface Props {
  visible: boolean;
  page: string;
  onClose: () => void;
}

export function PageSortModal({ page, visible, onClose }: Props) {
  const sort = useSettingsStore((state) => state.posts.sort);
  const setPostSort = useSettingsStore((state) => state.setPostSort);
  const handleSubmit = (type: string) => {
    if (sort === type) {
      onClose();
      return;
    }
    queryClient.removeQueries([page, sort]);
    setPostSort(type, 'sort');
    onClose();
  };
  return (
    <CustomModal visible={visible} onClose={onClose}>
      <ScrollView style={{ paddingBottom: 10 }}>
        {sortTypes.map((x) => (
          <ListItem
            text={x.text}
            icon={x.icon}
            onPress={() => handleSubmit(x.type)}
            key={x.type}
          />
        ))}
      </ScrollView>
    </CustomModal>
  );
}

const sortTypes = [
  {
    text: 'Hot',
    icon: 'fire',
    type: 'hot',
  },
  {
    text: 'New',
    icon: 'decagram-outline',
    type: 'new',
  },
  {
    text: 'Rising',
    icon: 'trending-up',
    type: 'rising',
  },
  {
    text: 'Top',
    icon: 'chart-bar',
    type: 'top',
  },
  {
    text: 'Controversial',
    icon: 'swap-vertical',
    type: 'controversial',
  },
] as const;
