import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {IMAGES} from '../theme';

interface GifImageComponentProps {
  imageUrl?: string;
  containerStyle?: any;
  imageStyle?: any;
}

const GifImageComponent: React.FC<GifImageComponentProps> = ({
  imageUrl = '',
  containerStyle = {},
  imageStyle = {},
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const onImageLoadEnd = () => {
    setIsLoading(false);
  };

  return (
    <View style={[styles.gifImageView, containerStyle]}>
      <FastImage
        source={{uri: imageUrl}}
        onError={onImageLoadEnd}
        onLoadEnd={onImageLoadEnd}
        fallback
        defaultSource={IMAGES.LEFT_ARROW}
        style={[styles.gifImage, imageStyle]}
        resizeMode={FastImage.resizeMode.contain}
      />
      {isLoading && (
        <View style={[styles.loader, imageStyle]}>
          <ActivityIndicator size={'small'} color={'red'} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gifImageView: {
    marginHorizontal: wp('1%'),
  },
  gifImage: {
    width: '100%',
    height: 75,
  },
  loader: {
    width: 100,
    height: 75,
    position: 'absolute',
  },
});

export default GifImageComponent;
