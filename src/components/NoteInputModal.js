import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
} from 'react-native';
import color from '../misc/color';
import IonIcons from 'react-native-vector-icons/Ionicons';

const NoteInputModal = ({visible, onClose, onSubmit, isEdit, note}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'desc') setDesc(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();
    if (isEdit) {
      onSubmit(title, desc, Date.now());
    } else {
      onSubmit(title, desc);
      setTitle('');
      setDesc('');
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');
      setDesc('');
    }
    onClose();
  };
  return (
    <>
      <Modal visible={visible} animationType="fade">
        <View style={styles.btnContainerBack}>
          <IonIcons
            name="arrow-back-outline"
            color={color.DARK}
            onPress={closeModal}
            size={30}
          />
          <Text style={styles.backTitle}>Back</Text>
        </View>

        <ScrollView style={styles.container}>
          <TextInput
            value={title}
            onChangeText={text => handleOnChangeText(text, 'title')}
            placeholder="Title"
            placeholderTextColor="grey"
            style={[styles.input, styles.title]}
          />
          <TextInput
            value={desc}
            onChangeText={text => handleOnChangeText(text, 'desc')}
            multiline
            placeholder="Note"
            placeholderTextColor="grey"
            style={[styles.input, styles.desc]}
          />
        </ScrollView>
        <TouchableWithoutFeedback>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
        <View style={styles.btnContainer}>
          {title.trim() || desc.trim() ? (
            <IonIcons
              name="checkmark-circle"
              color={color.PRIMARY}
              size={70}
              onPress={handleSubmit}
            />
          ) : null}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: color.LIGHT,
  },
  input: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    fontSize: 20,
    color: color.DARK,
  },
  title: {
    height: 50,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  desc: {
    height: -200,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 15,
    right: 30,
    flexDirection: 'row',
  },
  btnContainerBack: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  backTitle: {
    marginHorizontal: 25,

    fontSize: 22,
    color: color.DARK,
  },
});

export default NoteInputModal;
