import React, { useEffect } from 'react';
import { StyleSheet, Text, Pressable, View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { COLORS } from '../../constants';

const { width, height } = Dimensions.get('window');

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
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriver={true}
      hasBackdrop={false}
      coverScreen={false}
      style={styles.modal}
      backdropOpacity={0}
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
  container: {
    flex: 1,
    position: 'relative',
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
    top: '10%',
    justifyContent: 'flex-start',
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

