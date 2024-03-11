import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Header from '../components/Header';
import Input from '../components/Input';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating-widget';
import {MMKV} from 'react-native-mmkv';
import Toast from 'react-native-toast-message';

export const storage = new MMKV();

const Feedback: React.FC<{navigation: any}> = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [ratingError, setRatingError] = useState('');
  const [rating, setRating] = useState(0);

  const isValidEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = () => {
    let isValid = true;

    // Name validation
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    // Email validation
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    // Rating Gif
    if (!rating) {
      setRatingError('Please rate this Gif before submitting');
      isValid = false;
    } else {
      setRatingError('');
    }

    if (isValid) {
      Keyboard.dismiss();
      const user = {
        username: name,
        userEmail: email,
        gifRating: rating,
      };

      storage.set('user', JSON.stringify(user));
      Toast.show({
        type: 'success',
        text1: 'Information have been saved in Local storage',
        position: 'bottom',
      });
      setName('');
      setEmail('');
      setRating(0);
    }
  };

  const handleNameInput = (text: string) => {
    setName(text);
    setNameError('');
  };

  const handleEmailInput = (text: string) => {
    setEmail(text);
    setEmailError('');
  };

  const handleRating = (rating: number) => {
    setRating(rating);
    setRatingError('');
  };

  const goBack = () => {
    navigation.goBack();
  };
  const renderHeader = () => {
    return <Header title={'Feedback'} showBackButton onPressBack={goBack} />;
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.InputWrapper}>
          <Input
            placeholder="Name"
            onChangeText={handleNameInput}
            value={name}
            errorMessage={nameError}
          />
          <Input
            placeholder="Email"
            onChangeText={handleEmailInput}
            value={email}
            keyboardType="email-address"
            errorMessage={emailError}
            onSubmitEditing={handleSubmit}
          />
        </View>
        <View style={styles.ratingViewWrapper}>
          <Text style={styles.heading}>Rate Gif</Text>
          <StarRating rating={rating} onChange={handleRating} />
          <Text style={styles.ratingErrorTextStyle}>{ratingError}</Text>
        </View>

        <View style={styles.submitBtnWrapper}>
          <Button title="Submit" onPress={handleSubmit} color={'red'} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
  },
  InputWrapper: {
    marginTop: hp('2'),
    marginStart: widthPercentageToDP('5%'),
  },
  ratingViewWrapper: {
    marginTop: hp('5%'),
    marginStart: widthPercentageToDP('5%'),
  },
  submitBtnWrapper: {
    marginTop: hp('6%'),
    width: widthPercentageToDP('50%'),
    alignSelf: 'center',
  },
  ratingErrorTextStyle: {
    color: 'red',
    fontSize: 12,
    marginTop: hp('1%'),
  },
});

export default Feedback;
