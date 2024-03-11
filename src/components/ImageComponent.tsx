import React, {memo} from 'react';
import {Image, ImageProps} from 'react-native';

interface ImageComponentProps extends ImageProps {
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  resizeMode,
  ...props
}) => {
  return <Image resizeMode={resizeMode} {...props} />;
};

export default memo(ImageComponent);
