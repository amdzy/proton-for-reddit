import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { SubListItem } from './components/SubListItem/SubListItem';
import { useSubStore } from '@/stores';

interface Props {
  navigation: any;
}

export function SubscriptionsScreen({ navigation }: Props) {
  const subs = useSubStore((state) => state.subs);

  const memoizedSubs = useMemo(() => {
    const subsSorted = Object.values(subs).sort((a, b) => {
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
            image={item.icon}
            text={item.name}
            navigation={navigation}
            actions={index >= pagesArr.length}
          />
        )}
      />
    </View>
  );
}

const pagesArr = [
  {
    id: 1,
    name: 'Home',
    icon: '',
  },
  {
    id: 2,
    name: 'Popular',
    icon: '',
  },
  {
    id: 3,
    name: 'All',
    icon: '',
  },
  {
    id: 4,
    name: 'Saved',
    icon: '',
  },
];
