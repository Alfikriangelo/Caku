import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import color from '../misc/color';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = ({value, onChangeText, onClear}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        placeholderTextColor="grey"
        color={color.DARK}
        value={value}
        onChangeText={onChangeText}
      />
      {value ? (
        <Ionicons
          name="close-outline"
          size={35}
          color={color.PRIMARY}
          onPress={onClear}
          style={styles.clear}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderColor: color.SECONDARY,
    borderWidth: 0.5,
    height: 40,
    borderRadius: 40,
    paddingLeft: 10,
    fontSize: 15,
    marginVertical: 15,
  },
  clear: {
    position: 'absolute',
    right: 10,
    bottom: 15,
  },
  container: {
    justifyContent: 'center',
  },
});

export default SearchBar;
