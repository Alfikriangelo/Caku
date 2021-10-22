import React, {useState} from 'react';
import {Modal, Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../misc/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNotes} from '../context/NoteProvider';
import NoteInputModal from './NoteInputModal';

const formatDate = ms => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const NoteDetail = props => {
  const [note, setNote] = useState(props.route.params.note);
  const {setNotes} = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    props.navigation.goBack();
  };

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

  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => {
      if (n.id === note.id) {
        n.title = title;
        n.desc = desc;
        n.isUpdated = true;
        n.time = time;

        setNote(n);
      }
      return n;
    });
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };
  const handleOnClose = () => setShowModal(false);
  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.time}>
          {note.isUpdated
            ? `Updated At ${formatDate(note.time)}`
            : `Created At ${formatDate(note.time)}`}
        </Text>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <Ionicons
          size={50}
          name="trash-outline"
          style={{marginBottom: 15, color: color.GREY}}
          onPress={displayDeleteAlert}
        />
        <Ionicons
          size={50}
          name="create-outline"
          style={{color: color.GREY}}
          onPress={openEditModal}
        />
      </View>
      <NoteInputModal
        isEdit={isEdit}
        note={note}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: color.LIGHT,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: color.GREY,
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
    color: color.GREY,
  },
  time: {
    textAlign: 'right',
    fontSize: 13,
    opacity: 0.5,
    color: color.GREY,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
});

export default NoteDetail;
