import React, { useRef } from 'react';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { ProfileHeader } from '@/features/users/component';
import { useGetUserAbout } from '@/features/users/api';
import { useTheme } from '@/hooks';
import { ProfileAbout, ProfilePosts } from '@/features/users';

interface Props {
  route: any;
}

export function ProfileScreen({ route }: Props) {
  const name = route.params?.name;
  const aboutQuery = useGetUserAbout(name);

  const tabRef = useRef<any>();

  const theme = useTheme();

  const header = () => (
    <ProfileHeader
      id={aboutQuery.data?.subreddit.name}
      name={aboutQuery.data?.name || name}
      icon={aboutQuery.data?.snoovatar_img || aboutQuery.data?.icon_img}
      following={aboutQuery.data?.subreddit.user_is_subscriber}
    />
  );

  return (
    <Tabs.Container
      ref={tabRef}
      renderHeader={header}
      headerHeight={232}
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
      pagerProps={{
        scrollEnabled: true,
      }}
    >
      <Tabs.Tab name="A" label="About">
        <ProfileAbout
          name={name}
          totalKarma={aboutQuery.data?.total_karma}
          linkKarma={aboutQuery.data?.link_karma}
          commentKarma={aboutQuery.data?.comment_karma}
          awardeeKarma={aboutQuery.data?.awardee_karma}
          awarderKarma={aboutQuery.data?.awarder_karma}
          date={aboutQuery.data?.created_utc}
        />
      </Tabs.Tab>
      <Tabs.Tab name="B" label="Posts">
        <ProfilePosts name={name} />
      </Tabs.Tab>
    </Tabs.Container>
  );
}
