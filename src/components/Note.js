import React from 'react';
import {StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import color from '../misc/color';

const Note = ({item, onPress}) => {
  const {title, desc} = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text numberOfLines={3}>{desc}</Text>
    </TouchableOpacity>
  );
};
const width = Dimensions.get('window').width - 40;
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.PRIMARY,
    width: width / 2,
    padding: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.LIGHT,
  },
});
export default Note;
