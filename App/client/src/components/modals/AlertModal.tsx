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
      <Modal
        isVisible={modalVisible}
        backdropOpacity={1}
        animationIn="zoomIn"
        animationOut="fadeOut"
        backdropTransitionOutTiming={0}
        useNativeDriver={true}
        style={styles.modal}
        hasBackdrop={true}
      >
        <View style={styles.modalView}>
          <View style={styles.middleView}>
          <Text style={styles.modalText}>Wpm {wpm}</Text>
          </View>
        </View>
      </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
   modal: {
    justifyContent: 'flex-start',
    margin: 0,
    top: '10%',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',  
  },
  middleView: {
    backgroundColor: COLORS.grey,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    fontSize: 17, 
    color: COLORS.white, 
    fontWeight: '600'
  },
});

