import React, {FC, useEffect, useState} from 'react';
import {FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import {
  View,
  Text,
  Input,
  Header,
  Item,
  Icon,
  Button,
  Picker,
} from 'native-base';
import axios from 'axios';
import {Post} from 'components';
import {debounce, orderBy} from 'lodash';

const apiStatus = {
  idle: 'idle',
  pending: 'pending',
  rejected: 'rejected',
  resolved: 'resolved',
};

type Props = {
  navigation: any;
};

export const Posts: FC<Props> = ({navigation}) => {
  const [posts, setPosts] = useState<any>([]);
  const [pageNo, setPageNo] = useState(0);
  const [searchedResults, setSearchedResults] = useState<any>([]);
  const [status, setStatus] = useState(apiStatus.idle);
  const [selectedValue, setSelectedValue] = useState('none');

  const apiCall = async () => {
    console.log('api called', pageNo);
    setStatus(apiStatus.pending);
    try {
      const res = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNo}`,
      );

      if (res?.data) {
        setPosts([...posts, ...res?.data?.hits]);
        setStatus(apiStatus.resolved);
      }
    } catch (error) {
      console.log('err', error);
      setStatus(apiStatus.rejected);
    }
  };

  const onEndReached = () => {
    setPageNo(prev => prev + 1);
    apiCall();
  };

  const onSearch = debounce((val: string) => {
    console.log(val);

    if (val && posts.length) {
      const pattern = `[A-Za-z.\s]*${val.toLowerCase()}[A-Za-z.\s]*`;
      const matchRegEx = new RegExp(pattern);
      const byTitle = posts.filter((data: any) =>
        matchRegEx.test(data.title.toLowerCase()),
      );

      const byAuthor = posts.filter((data: any) =>
        matchRegEx.test(data.author.toLowerCase()),
      );

      const byUrl = posts.filter((data: any) => matchRegEx.test(data.url));
      setSearchedResults([...byTitle, ...byAuthor, ...byUrl]);
    } else {
      setSearchedResults([]);
    }
  }, 20);

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      setInterval(() => {
        apiCall();
      }, 10000);
    }
    return () => {
      isMount = false;
    };
  }, []);

  const onFilter = (order: 'asc' | 'desc') => {
    console.log('order', order);
    setSelectedValue(order);
    if (order.match(/none/i)) {
      setSearchedResults([]);
    } else {
      const res = orderBy(posts, o => new Date(o.created_at), order);
      setSearchedResults(res);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input
                placeholder="Search by title, author, url"
                onChangeText={e => onSearch(e)}
              />

              <Picker
                mode="dropdown"
                iosIcon={<Icon name="filter" />}
                selectedValue={selectedValue}
                onValueChange={onFilter}>
                <Picker.Item label="Asc" value="asc" />
                <Picker.Item label="Desc" value="desc" />
                <Picker.Item label="None" value="none" />
              </Picker>
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
        }
        data={searchedResults.length > 0 ? searchedResults : posts}
        renderItem={({item, index}) => (
          <Post item={item} index={index} navigation={navigation} />
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={200}
        keyExtractor={(_, i) => String(i)}
        ListFooterComponent={
          <View>
            {status === apiStatus.pending && searchedResults.length === 0 ? (
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 12,
                }}>
                <ActivityIndicator size={20} color="#999" />
                <Text>Loading...</Text>
              </View>
            ) : null}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
