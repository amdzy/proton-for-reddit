import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Spacer, SubText } from '@/components';
import { AwardsDTO } from '../../types';

interface Props {
  awards: Array<AwardsDTO>;
}

export const Awards = React.memo(
  ({ awards }: Props) => {
    if (awards.length === 0) {
      return null;
    }

    return (
      <View style={styles.container}>
        {awards.map((award: any) => (
          <View style={styles.awardContainer} key={award.id}>
            <Avatar size={16} image={award.resized_static_icons[1].url} />
            <Spacer size={6} horizontal />
            <SubText>
              x
              {award.count}
            </SubText>
          </View>
        ))}
      </View>
    );
  },
  () => true,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    paddingTop: 0,
  },
  awardContainer: {
    flexDirection: 'row',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
