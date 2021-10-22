import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Text, View} from 'react-native';

const NotFound = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Ionicons
        style={styles.sadIcon}
        name="sad-outline"
        size={100}
        color="black"
      />
      <Text style={{marginTop: 20, fontSize: 20, color: 'black'}}>
        Result Not Found
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
    zIndex: -1,
  },
});
export default NotFound;
