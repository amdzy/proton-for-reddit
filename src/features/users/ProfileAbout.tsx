import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import { SubText, Text } from '@/components';
import { useGetUserTrophies } from './api';
import { Karma, ModeratedDisplay, TrophyDisplay } from './component';
import { timeRelative } from '@/utils';
import { timeFormatted } from '@/utils/timeFormatted';

interface Props {
  name: string;
  totalKarma?: number;
  linkKarma?: number;
  commentKarma?: number;
  awardeeKarma?: number;
  awarderKarma?: number;
  date?: number;
}

export function ProfileAbout({
  name,
  totalKarma,
  linkKarma,
  commentKarma,
  awardeeKarma,
  awarderKarma,
  date,
}: Props) {
  const query = useGetUserTrophies(name);

  return (
    <Tabs.ScrollView>
      <View style={styles.karmaContainer}>
        <View>
          <SubText fontSize={18}>Karma</SubText>
          <Text style={{ fontSize: 20 }}>{totalKarma}</Text>
          <View style={styles.row}>
            <Karma icon="link" karma={linkKarma} />
            <Karma icon="comment-outline" karma={commentKarma} />
          </View>
          <View style={styles.row}>
            <Karma icon="hand-heart" karma={awarderKarma} />
            <Karma icon="heart-circle" karma={awardeeKarma} />
          </View>
        </View>
        <View>
          <SubText fontSize={18}>Cake Day</SubText>
          {date && (
            <Text style={{ fontSize: 20 }}>{timeRelative(date)} ago</Text>
          )}
          {date && <Karma icon="cake-variant" karma={timeFormatted(date)} />}
        </View>
      </View>
      <TrophyDisplay trophies={query.data?.trophies} />
      <ModeratedDisplay moderated={query.data?.mods} />
    </Tabs.ScrollView>
  );
}

const styles = StyleSheet.create({
  karmaContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: 20,
    justifyContent: 'space-between',
  },
  row: { flexDirection: 'row' },
});
