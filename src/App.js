import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import Intro from './screens/Intro';
import NoteScreen from './screens/NoteScreen';
import {createStackNavigator} from '@react-navigation/stack';
import NoteDetail from './components/NoteDetail';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import NoteProvider from './context/NoteProvider';
import SplashScreen from './screens/SplashScreen';
import color from './misc/color';
import {Alert} from 'react-native';
const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if (result === null) return setIsAppFirstTimeOpen(true);

    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
  };

  useEffect(() => {
    findUser();
  }, []);

  const renderNoteScreen = props => <NoteScreen {...props} user={user} />;

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;

  const displayDeleteAlert = () => {
    Alert.alert(
      'Are You Sure?',
      'This action will delete your note permanently',
      [
        {
          text: 'No Thanks',
          onPress: () => console.log('cancel'),
        },
        {
          text: 'Delete',
          onPress: deleteNote,
        },
      ],
    );
  };

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    props.navigation.goBack();
  };
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="SplashScreen"
            component={SplashScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            component={renderNoteScreen}
            name="NoteScreen"
          />
          <Stack.Screen
            component={NoteDetail}
            name="Note Detail"
            options={{
              title: 'Detail Notes',
              headerRight: () => (
                <Text onPress={displayDeleteAlert} style={styles.delete}>
                  Delete
                </Text>
              ),
            }}
          />
          <Stack.Screen component={NoteDetail} name="Add Note" />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  delete: {
    color: color.ERROR,
    marginRight: 22,
    fontWeight: 'bold',
  },
});
