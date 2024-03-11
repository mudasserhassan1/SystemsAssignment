import React from 'react';
import {
  KeyboardTypeOptions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ImageComponent from './ImageComponent';

interface InputProps {
  leftImage?: boolean;
  leftImageSrc?: any;
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  keyboardType?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onTouchStart?: () => void;
  borderColor?: string;
  editable?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  inputRef?: React.Ref<TextInput>;
  onSubmitEditing?: () => void;
  maxLength?: number;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  autoComplete?:
    | 'off'
    | 'username'
    | 'password'
    | 'email'
    | 'name'
    | 'tel'
    | 'street-address'
    | 'postal-code'
    | 'cc-number'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year';
  autoCorrect?: boolean;
  textContentType?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password';
  inPutWidth?: number | string;
  borderWidth?: number;
  borderRightWidth?: number;
  blurOnSubmit?: boolean;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  leftImage,
  leftImageSrc,
  placeholder,
  onChangeText,
  value,
  keyboardType,
  onFocus,
  onBlur,
  onTouchStart,
  borderColor = 'grey',
  editable,
  autoCapitalize,
  inputRef,
  onSubmitEditing,
  maxLength = 30,
  returnKeyType = 'next',
  autoComplete,
  autoCorrect,
  textContentType,
  inPutWidth = wp('90%'),
  borderWidth = 1,
  blurOnSubmit = false,
  errorMessage = '',
}) => {
  return (
    <View
      style={[
        styles.InputView,
        {
          width: inPutWidth,
          borderWidth,
          borderColor,
        },
      ]}>
      {leftImage && (
        <ImageComponent
          source={leftImageSrc}
          style={styles.leftImage}
          resizeMode={undefined}
        />
      )}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          keyboardType={keyboardType as KeyboardTypeOptions}
          placeholderTextColor={'grey'}
          selectionColor={'black'}
          style={styles.input}
          importantForAutofill={'yes'}
          autoCorrect={autoCorrect}
          autoComplete={autoComplete}
          textContentType={textContentType}
          editable={editable}
          onChangeText={onChangeText}
          value={value}
          onBlur={onBlur}
          onFocus={onFocus}
          onTouchStart={onTouchStart}
          autoCapitalize={autoCapitalize}
          autoFocus={false}
          ref={inputRef}
          onSubmitEditing={onSubmitEditing}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          blurOnSubmit={blurOnSubmit}
        />
      </View>
      {errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  InputView: {
    height: 55,
    marginTop: hp('3%'),
    borderRadius: wp('2%'),
    backgroundColor: 'white',
  },
  inputContainer: {
    width: wp('100%'),
  },
  input: {
    width: '90%',
    height: '100%',
    color: 'black',
    paddingLeft: wp('2.5%'),
    fontStyle: 'normal',
    fontSize: Platform.OS === 'ios' ? 18 : 15,
  },
  leftImage: {
    width: 30,
    height: 30,
    left: wp('2%'),
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: wp('2.5%'),
  },
});

export default Input;
