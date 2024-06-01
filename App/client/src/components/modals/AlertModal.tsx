import React, { useEffect } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import Modal from 'react-native-modal';
import { COLORS } from '../../constants';

const AlertModal = ({ modalVisible, setModalVisible, wpm, timeoutDuration = 3000}) => {
  useEffect(() => {
    let timer;
    if (modalVisible) {
      timer = setTimeout(() => {
        setModalVisible(false);
      }, timeoutDuration);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [modalVisible, timeoutDuration]);

  return (
    <View style={styles.centeredView}>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        backdropOpacity={0}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        backdropTransitionOutTiming={0}
        useNativeDriver={true}
        style={styles.modal}
        hasBackdrop={true}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Wpm {wpm}</Text>
        </View>
      </Modal>
    </View>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
   modal: {
    justifyContent: 'flex-start',
    margin: 0,
    top: '10%',
    backgroundColor: 'red',
  },
  modalView: {
    backgroundColor: COLORS.grey,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    fontSize: 17, 
    color: COLORS.white, 
    fontWeight: 600
  },
});


