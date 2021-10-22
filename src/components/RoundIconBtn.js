import React from 'react';
import {StyleSheet, View} from 'react-native';
import color from '../misc/color';
import IonIcons from 'react-native-vector-icons/Ionicons';

const RoundIconBtn = ({onPress, iconName}) => {
  return (
    <IonIcons
      name={iconName}
      size={30}
      color="#FEF9EF"
      style={styles.icon}
      onPress={onPress}
    />
  );
};

export default RoundIconBtn;

const styles = StyleSheet.create({
  icon: {
    backgroundColor: color.PRIMARY,
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
});
