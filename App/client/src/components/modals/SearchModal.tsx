import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants';
import { BlurView } from 'expo-blur';

const SearchModal = ({ modalVisible, setModalVisible }) => {
  return (
    <SafeAreaView style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <BlurView intensity={40} style={{ flex: 1 }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </BlurView>
      </Modal>
    </SafeAreaView>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height,
    // backgroundColor: COLORS.grey,
    marginTop: 150,
    padding: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

