import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NoteInputModal from '../components/NoteInputModal';
import SearchBar from '../components/SearchBar';
import color from '../misc/color';
import Note from '../components/Note';
import {useNotes} from '../context/NoteProvider';
import NotFound from '../components/NotFound';
import NoteDetail from '../components/NoteDetail';

const NoteScreen = ({user, navigation}) => {
  const [greet, setGreet] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const {notes, setNotes, findNotes} = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [resultNotFound, setResultNotFound] = useState(false);
  const reverseData = data => {
    return data.sort((a, b) => {
      const aInt = parseInt(a.time);
      const bInt = parseInt(b.time);
      if (aInt < bInt) return 1;
      if (aInt == bInt) return 0;
      if (aInt > bInt) return -1;
    });
  };
  const findGreet = () => {
    const hours = new Date().getHours();
    if (hours === 0 || hours < 12) return setGreet('Morning');
    if (hours === 1 || hours < 17) return setGreet('Afternoon');
    setGreet('Evening');
  };

  useEffect(() => {
    findGreet();
  }, []);

  const reverseNotes = reverseData(notes);
  const handleOnSubmit = async (title, desc) => {
    const note = {id: Date.now(), title, desc, time: Date.now()};
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const openNote = note => {
    navigation.navigate('Note Detail', {note});
  };

  const handleOnSearchInput = async text => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery('');
      setResultNotFound(false);
      return await findNotes();
    }
    const filteredNotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });
    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery('');
    setResultNotFound(false);
    await findNotes();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={color.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>{`Good ${greet} ${user.name}`} </Text>
          {notes.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              onClear={handleOnClear}
            />
          ) : null}

          {resultNotFound ? (
            <NotFound />
          ) : (
            <FlatList
              data={reverseNotes}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 15,
              }}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <Note
                  visible={modalDetail}
                  onPress={() => openNote(item)}
                  item={item}
                />
              )}
            />
          )}
          {!notes.length ? (
            <View
              style={[
                styles.emptyHeaderContainer,
                StyleSheet.absoluteFillObject,
              ]}>
              <Text style={styles.emptyHeader}>Add Notes</Text>
            </View>
          ) : null}
          <Ionicons
            onPress={() => setModalVisible(true)}
            name="add-circle"
            size={75}
            color={color.PRIMARY}
            style={styles.addBtn}
          />
        </View>
      </TouchableWithoutFeedback>

      <NoteInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    zIndex: 1,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: color.DARK,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
    color: color.DARK,
  },
  emptyHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    zIndex: -1,
  },
  addBtn: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
});

export default NoteScreen;
