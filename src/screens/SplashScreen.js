import React, {Component} from 'react';
import {StackActions} from '@react-navigation/native';
import {View, Image, Text} from 'react-native';
import color from '../misc/color';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(StackActions.replace('NoteScreen'));
    }, 3000);
  }
  render() {
    return (
      <View style={{marginHorizontal: 30, marginVertical: 150}}>
        <Image
          style={{
            height: 300,
            width: 300,
          }}
          source={require('../assets/note.png')}
        />
        <Text
          style={{
            color: color.PRIMARY,
            fontSize: 70,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Caku
        </Text>
      </View>
    );
  }
}
