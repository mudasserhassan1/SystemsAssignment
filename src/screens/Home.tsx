import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {debounce} from 'lodash';
import GifImageComponent from '../components/GifImageComponent';
import Header from '../components/Header';
import SearchComponent from '../components/SearchBar';
import fetchApiData from '../services/APICaller';
import {IMAGES} from '../theme';

interface GifItem {
  _id: string;
  title: string;
  images: {
    original: {
      url: string;
    };
  };
}
const limit = 15;

const TrendingGifs: React.FC<{navigation: any}> = ({navigation}) => {
  const [trendingGifs, setTrendingGifs] = useState<GifItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GifItem[]>([]);

  const isEndReached = useRef<Boolean>(false);
  const searchEndReached = useRef<Boolean>(false);
  const searchOffset = useRef<number>(0);
  const offset = useRef<number>(0);

  useEffect(() => {
    fetchTrendingGifs().then();
  }, []);

  const getItemKeys = (item: GifItem) => item._id;

  const fetchTrendingGifs = async () => {
    try {
      const response = await fetchApiData(
        'https://api.giphy.com/v1/gifs/trending',
        limit,
        {offset: offset.current},
      );
      if (response.data.length < limit) {
        isEndReached.current = true;
      } else {
        if (offset.current === 0) {
          setTrendingGifs(response.data);
        } else {
          setTrendingGifs(prevGifs => [...prevGifs, ...response?.data]);
        }
        offset.current += limit;
      }
    } catch (error) {
      console.error('Error fetching trending GIFs:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadMore(false);
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      searchOffset.current = 0;
      searchEndReached.current = false;
    }
  }, [searchQuery]);

  const handleEndReached = async () => {
    if (!loading) {
      if (isSearchActive) {
        if (!searchEndReached.current) {
          setLoadMore(true);
          await handleSearch(searchQuery);
        }
      } else {
        if (!isEndReached.current) {
          setLoadMore(true);
          await fetchTrendingGifs();
        }
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (isSearchActive) {
      searchOffset.current = 0;
      await handleSearch(searchQuery);
    } else {
      offset.current = 0;
      await fetchTrendingGifs();
    }
  };

  const isSearchActive = useMemo(() => {
    return !!searchQuery.length && !!searchResults.length;
  }, [searchResults, searchQuery]);

  const handleSearch = async (text: string) => {
    if (searchQuery) {
      try {
        setLoading(true);
        const response = await fetchApiData(
          'https://api.giphy.com/v1/gifs/search',
          limit,
          {q: text, offset: searchOffset.current},
        );
        if (response?.data?.length < limit) {
          searchEndReached.current = true;
        } else {
          if (searchOffset.current === 0) {
            setSearchResults(response.data);
          } else {
            setSearchResults(oldResults => [...oldResults, ...response?.data]);
          }
          searchOffset.current += limit;
        }
      } catch (error) {
        console.error('Error searching GIFs:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }
  };

  const searchDebounce = useCallback(debounce(handleSearch, 700), []);

  const updateSearch = (text: string) => {
    if (text.length) {
      searchDebounce(text);
    }
    setSearchQuery(text);
    searchOffset.current = 0;
    searchEndReached.current = false;
  };
  const onSubmitEditing = async () => {
    await handleSearch(searchQuery);
  };

  const goToFeedBackScreen = () => {
    navigation.navigate('Feedback');
  };

  const renderHeader = () => {
    return <Header title={'Trending Gifs'} />;
  };

  const listFooterComponent = () => {
    return loadMore ? <ActivityIndicator size="small" color='red' /> : null;
  };

  const renderGifItem = ({item}: {item: GifItem}) => (
    <Pressable onPress={goToFeedBackScreen} style={styles.gifContainer}>
      <View style={styles.imageContainer}>
        <GifImageComponent
          containerStyle={styles.itemImage}
          imageUrl={item.images.original.url}
          imageStyle={styles.gifImageStyle}
        />
      </View>
      <Text style={styles.gifTitle}>{item.title}</Text>
    </Pressable>
  );

  const shouldDisplayFullScreenLoader = useMemo(
    () => loading && !refreshing && !loadMore,
    [loading, refreshing, loadMore],
  );

  return (
    <SafeAreaView style={styles.container}>
      {shouldDisplayFullScreenLoader && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color='red' />
        </View>
      )}
      {renderHeader()}

      <View style={styles.searchComponentWrapper}>
        <SearchComponent
          leftImage
          placeholder={'Search GIFs...'}
          isLoading={loading}
          leftImageSrc={IMAGES.SEARCH_ICON}
          onChangeText={updateSearch}
          onFocus={() => (offset.current = 0)}
          onSubmitEditing={onSubmitEditing}
          withCrossButton
        />
      </View>

      <FlatList
        data={isSearchActive ? searchResults : trendingGifs}
        keyExtractor={getItemKeys}
        renderItem={renderGifItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          alignItems: 'center',
          marginTop: hp('2%'),
          marginBottom: hp('12%'),
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0000ff']}
            tintColor={'#0000ff'}
          />
        }
        ListFooterComponent={listFooterComponent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
  gifContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'red',
    padding: 8,
    marginBottom: 16,
    width: '90%',
    height: hp('18%'),
  },
  imageContainer: {
    marginRight: 8,
  },
  gifTitle: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: hp('7%'),
    backgroundColor: '#F0F0F0',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    width: '100%',
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
  },
  searchComponentWrapper: {
    height: hp('10%'),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderStyle: {
    right: wp('1%'),
  },
  itemImage: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  gifImageStyle: {
    height: hp('20%'),
    width: wp('28%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TrendingGifs;
