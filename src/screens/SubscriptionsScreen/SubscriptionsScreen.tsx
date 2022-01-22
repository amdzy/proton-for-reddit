import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { useSubStore } from '@/stores';
import { SubListItem } from '@/features/sub/components';

const pagesArr = [
  {
    id: '1',
    name: 'Home',
    icon: '',
  },
  {
    id: '2',
    name: 'Popular',
    icon: '',
  },
  {
    id: '3',
    name: 'All',
    icon: '',
  },
  {
    id: '4',
    name: 'Saved',
    icon: '',
  },
];

interface Props {
  navigation: any;
}

export function SubscriptionsScreen({ navigation }: Props) {
  const subs = useSubStore((state) => state.subs);

  const memoizedSubs = useMemo(() => {
    const subsSorted = subs.sort((a, b) => {
      const first = a.name.toLowerCase();
      const second = b.name.toLowerCase();
      if (first > second) return 1;
      if (first < second) return -1;
      return 0;
    });
    return [...pagesArr, ...subsSorted];
  }, [subs]);

  return (
    <View>
      <FlatList
        data={memoizedSubs}
        renderItem={({ item, index }) => (
          <SubListItem
            icon={item.icon}
            name={item.name}
            id={item.id}
            navigation={navigation}
            actions={index >= pagesArr.length}
          />
        )}
      />
    </View>
  );
}
