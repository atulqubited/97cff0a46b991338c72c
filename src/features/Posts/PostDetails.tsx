import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Header, Left, Icon, Button, Title, Body} from 'native-base';
// @ts-ignore
import JSONTree from 'react-native-json-tree';
type Props = {
  navigation: any;
  route: any;
};

export const PostDetails: FC<Props> = ({navigation, route}) => {
  const {doc} = route.params;
  return (
    <Container style={styles.container}>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Post Details</Title>
        </Body>
      </Header>
      <JSONTree data={doc} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
