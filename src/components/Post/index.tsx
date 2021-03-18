import React, {FC} from 'react';
import {Linking} from 'react-native';
import {Content, List, ListItem, Text, View} from 'native-base';
import {colors} from 'utils';
import moment from 'moment';

type Props = {
  navigation: any;
  item: any;
  index: number;
};

export const Post: FC<Props> = ({navigation, item}) => {
  return (
    <Content>
      <List>
        <ListItem
          onPress={() => navigation.navigate('PostDetails', {doc: item})}>
          <View>
            <Text style={{color: colors.gray, fontSize: 12}}>
              {moment(item?.created_at).format('lll')}
            </Text>

            <Text>{item?.title}</Text>
            <Text
              style={{
                lineHeight: 27,
                fontSize: 12,
                textTransform: 'capitalize',
              }}>
              Author -&nbsp;
              <Text
                style={{
                  lineHeight: 27,
                  fontWeight: '700',
                  fontSize: 14,
                  textTransform: 'capitalize',
                }}>
                {item?.author}
              </Text>
            </Text>

            <Text
              onPress={() => Linking.openURL(item?.url)}
              style={{color: colors.lightBlue2, fontSize: 13}}>
              {item?.url || 'No Url Found'}
            </Text>
          </View>
        </ListItem>
      </List>
    </Content>
  );
};
