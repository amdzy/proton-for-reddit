import React, { useRef } from 'react';
import { View } from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { ProfileHeader } from '@/features/users/component';
import { useGetUserAbout } from '@/features/users/api';
import { useTheme } from '@/hooks';
import { ProfilePosts } from '@/features/users';

interface Props {
  route: any;
}

// const Tab = createMaterialTopTabNavigator();
// const END_POSITION = -232;

export function ProfileScreen({ route }: Props) {
  const name = route.params?.name;
  const aboutQuery = useGetUserAbout(name);

  const tabRef = useRef<any>();

  const theme = useTheme();
  // const position = useSharedValue(0);

  const header = () => (
    <ProfileHeader
      id={aboutQuery.data?.subreddit.name}
      name={aboutQuery.data?.name || name}
      icon={aboutQuery.data?.snoovatar_img || aboutQuery.data?.icon_img}
      following={aboutQuery.data?.subreddit.user_is_subscriber}
      karma={aboutQuery.data?.total_karma}
      date={aboutQuery.data?.created_utc}
    />
  );

  return (
    <Tabs.Container
      ref={tabRef}
      renderHeader={header}
      containerStyle={{ maxWidth: '100%' }}
      headerContainerStyle={{
        backgroundColor: theme.toolbar,
      }}
      renderTabBar={(props) => (
        <MaterialTabBar
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          activeColor={theme.primary}
          inactiveColor={theme.text}
        />
      )}
      lazy
    >
      <Tabs.Tab name="A" label="About">
        <Tabs.ScrollView>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <View style={{ width: 40, height: 40, backgroundColor: 'blue' }} />
          </View>
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="B" label="Posts">
        <ProfilePosts name={name} />
      </Tabs.Tab>
      <Tabs.Tab name="C" label="Comments">
        <Tabs.ScrollView>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <View style={{ width: 40, height: 40, backgroundColor: 'blue' }} />
          </View>
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
}
