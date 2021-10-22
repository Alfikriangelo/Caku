import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import RoundIconBtn from '../components/RoundIconBtn';
import color from '../misc/color';

const Intro = ({onFinish}) => {
  const [name, setName] = useState('');
  const handleOnChangeText = text => {
    setName(text);
  };

  const handleSubmit = async () => {
    const user = {name: name};
    await AsyncStorage.setItem('user', JSON.stringify(user));
    if (onFinish) onFinish();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputTitle}>Enter Your Name to Continue</Text>

      {name.length >= 3 ? (
        <TextInput
          value={name}
          onChangeText={handleOnChangeText}
          placeholder="Enter Your Name..."
          style={styles.textInput2}
          color="black"
        />
      ) : (
        <TextInput
          value={name}
          onChangeText={handleOnChangeText}
          placeholder="Enter Your Name..."
          style={styles.textInput}
        />
      )}

      {name.trim().length >= 3 ? (
        <RoundIconBtn
          iconName="chevron-forward-outline"
          onPress={handleSubmit}
        />
      ) : null}
    </View>
  );
};

const width = Dimensions.get('window').width - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  textInput: {
    borderWidth: 2,
    borderColor: color.DARK,
    width,
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 25,
    marginBottom: 15,
  },
  textInput2: {
    borderWidth: 2,
    borderColor: color.PRIMARY,
    width,
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 25,
    marginBottom: 15,
  },
  inputTitle: {
    alignSelf: 'flex-start',
    paddingLeft: 25,
    marginBottom: 5,
    opacity: 0.5,
    color: color.DARK,
  },
});

export default Intro;
