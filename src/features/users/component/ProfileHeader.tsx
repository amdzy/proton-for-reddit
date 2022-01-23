import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  HighlightedText,
  SubText,
  TabButton,
  Text,
} from '@/components';
import { useTheme } from '@/hooks';
import { ColorsDTO } from '@/stores/types';
import { FollowBtn } from './FollowBtn';

interface Props {
  id?: string;
  name: string;
  icon?: string;
  following?: boolean;
  karma?: number;
  date?: number;
}

export function ProfileHeader({
  id,
  name,
  icon,
  following,
  karma,
  date,
}: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={{ backgroundColor: theme.toolbar }}>
      <View style={styles.container}>
        <Avatar image={icon} size={65} placeholder="user" />
        <HighlightedText fontSize={18} style={styles.userName}>
          {name}
        </HighlightedText>
        {following !== undefined && id !== undefined && (
          <FollowBtn following={following} name={name} id={id} />
        )}
        <View style={styles.dataContainer}>
          <View>
            <Text>Karma:</Text>
            <Text>{karma}</Text>
          </View>
          <View>
            <Text>Cake Day:</Text>
            <SubText>{date}</SubText>
          </View>
        </View>
      </View>
      {/* <View style={styles.dataContainer}>
        <TabButton text="Posts" active onPress={() => {}} />
        <TabButton text="Comments" active={false} onPress={() => {}} />
      </View> */}
    </View>
  );
}

const makeStyles = (theme: ColorsDTO) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      padding: 35,
      backgroundColor: theme.toolbar,
      paddingBottom: 0,
    },
    userName: {
      marginTop: 12,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 6,
      paddingHorizontal: 8,
      borderWidth: 1,
      borderRadius: 16,
      borderColor: 'white',
      marginTop: 12,
    },
    dataContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginTop: 12,
    },
  });
