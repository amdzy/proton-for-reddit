import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, HighlightedText } from '@/components';
import { useTheme } from '@/hooks';
import { ColorsDTO } from '@/stores/types';
import { FollowBtn } from './FollowBtn';

interface Props {
  id?: string;
  name: string;
  icon?: string;
  following?: boolean;
}

export function ProfileHeader({ id, name, icon, following }: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.itemsContainer}>
        <Avatar image={icon} size={65} placeholder="user" />
        <View style={{ alignItems: 'center' }}>
          <HighlightedText fontSize={18} style={styles.userName}>
            {name}
          </HighlightedText>
          {following !== undefined && id !== undefined && (
            <FollowBtn following={following} name={name} id={id} />
          )}
        </View>
      </View>
    </View>
  );
}

const makeStyles = (theme: ColorsDTO) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.toolbar,
      paddingBottom: 10,
    },
    itemsContainer: {
      alignItems: 'center',
      padding: 35,
      backgroundColor: theme.toolbar,
      paddingBottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    userName: {
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

// <View style={styles.dataContainer}>
//         <View>
//           <Text>Karma:</Text>
//           <Text>{karma}</Text>
//         </View>
//         <View>
//           <Text style={{ textAlign: 'center' }}>Cake Day:</Text>
//           {date && <SubText fontSize={13}>{timeFormatted(date)}</SubText>}
//         </View>
//       </View>
