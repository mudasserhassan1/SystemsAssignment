import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {IMAGES} from '../theme';

interface HeaderProps {
  title: string;
  onPressBack?: () => void;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onPressBack,
  showBackButton = true,
}) => {
  return (
    <View style={styles.header}>
      {showBackButton && onPressBack && (
        <TouchableOpacity onPress={onPressBack} style={styles.backButton}>
          <Image
            source={IMAGES.LEFT_ARROW}
            style={styles.backBtnStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      <Text style={styles.heading}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 8,
    width: '100%',
  },
  heading: {
    fontSize: 24,
    color: '#000000',
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 25,
  },
  backBtnStyle: {
    height: 25,
    width: 25,
  },
});

export default Header;
