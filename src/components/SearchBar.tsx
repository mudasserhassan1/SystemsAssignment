import React, {useMemo} from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ImageComponent from "./ImageComponent";

interface SearchComponentProps {
  leftImageSrc?: any;
  rightImageSrc?: any;
  placeholder?: string;
  onChangeText: (text: string, clear?: boolean) => void;
  value?: string;
  keyboardType?: string;
  secureTextEntry?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onRightIconPress?: () => void;
  onLeftIconPress?: () => void;
  onTouchStart?: () => void;
  editable?: boolean;
  autoCapitalize?: string;
  inputRef?: any;
  onSubmitEditing?: () => void;
  maxLength?: number;
  returnKeyType?: string;
  returnKeyLabel?: string;
  autoCorrect?: boolean;
  textContentType?: string;
  isLoading?: boolean;
  loaderStyle?: any;
  crossStyle?: any;
  withCrossButton?: boolean;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  leftImageSrc,
  rightImageSrc,
  placeholder = '',
  onChangeText,
  value,
  onFocus,
  onBlur,
  onRightIconPress,
  onLeftIconPress,
  editable,
  inputRef,
  onSubmitEditing,
  isLoading,
  crossStyle,
  withCrossButton = false,
}) => {
  const onCrossPress = () => {
    onChangeText('', true);
  };

  const renderCrossButton = useMemo(() => {
    if (withCrossButton && !isLoading && value) {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onCrossPress}
          style={[styles.loaderView, styles.crossView, crossStyle]}>
          {/*<ImageComponent*/}
          {/*    source={IMAGES.CLEAR_SEARCH_BAR}*/}
          {/*    style={styles.crossIcon}*/}
          {/*/>*/}
        </TouchableOpacity>
      );
    }
    return null;
  }, [withCrossButton, isLoading, value]);

  return (
    <View style={styles.inputParent}>
      <Pressable
        hitSlop={30}
        style={styles.leftImageContainer}
        onPress={onLeftIconPress}>
        <ImageComponent source={leftImageSrc} style={styles.leftImage} />
      </Pressable>
      <View style={styles.inputView}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={'grey'}
          style={styles.input}
          editable={editable}
          onChangeText={onChangeText}
          value={value}
          onBlur={onBlur}
          onFocus={onFocus}
          ref={inputRef}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={'search'}
        />
      </View>
      {renderCrossButton}
      <TouchableOpacity style={styles.eyeButtonView} onPress={onRightIconPress}>
        {/*<ImageComponent source={rightImageSrc} style={styles.rightImage} />*/}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputParent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: '88.5%',
    borderRadius: wp('2%'),
    backgroundColor: 'white',
    marginStart: wp('6%'),
    marginEnd: wp('6%'),
  },
  inputView: {width: '81%'},
  input: {
    width: '100%',
    height: '100%',
    paddingEnd: wp('3%'),
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: 'black',
  },
  eyeButtonView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    ...Platform.select({
      ios: {
        right: 0,
      },
      android: {
        right: wp('4%'),
      },
    }),
  },
  leftImageContainer: {
    paddingRight: wp('4%'),
  },
  leftImage: {
    width: 20,
    height: 20,
    left: wp('2.5%'),
    tintColor: '#616060',
  },
  rightImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    right: Platform.OS === 'ios' ? wp('4%') : wp('1%'),
  },
  loaderView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    position: 'absolute',
    right: wp('7%'),
  },
  crossView: {
    backgroundColor: 'grey',
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    right: wp('4.5%'),
    zIndex: 999,
  },
  crossIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
export default SearchComponent;
