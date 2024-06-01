import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  KeyboardAvoidingView,
  Keyboard, 
  TouchableWithoutFeedback, 
  TouchableOpacity, 
  Platform, 
  Dimensions,
  Pressable,
  ScrollView
} from 'react-native';
import BottomSheet, { 
  BottomSheetBackdrop, 
  BottomSheetFooter,
  BottomSheetTextInput, 
  useBottomSheetTimingConfigs, 
  BottomSheetScrollView 
} from "@gorhom/bottom-sheet";
import { COLORS } from '../../constants/index.tsx';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const ConfirmationBottomSheet = ({ children, snapIndex, setSnapIndex, setSnapIndexForSettings, bottomSheetRefForSettings }: Props & { snapIndex: number }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const calcWpm = (value) => {
    setWpm(value);
  };

  const snapPoints = useMemo(() => ['25%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setSnapIndex(index);
  }, []);

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 400,
  });

  const handleUpdate = () => {
    setModalVisible(true);
  };

  const confirmReset = () => {
    bottomSheetRef.current.close();
    bottomSheetRefForSettings.current.close();
  };

  const cancelReset = () => {
    bottomSheetRef.current.close();
  };

  const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
        closeOnPress={true}
        enableTouchThrough={true}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
			/>
		),
		[]
	);

  return (
    <View style={styles.container}>
      {children} 
      <BottomSheet
        ref={bottomSheetRef}
        index={snapIndex}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}
        handleStyle={{ backgroundColor: 'transparent' }}
        handleIndicatorStyle={{ backgroundColor: '#fff', width: 50, height: 0 }}
        backgroundStyle={{  backgroundColor: 'transparent' }} 
        backdropComponent={renderBackdrop}
        animationConfigs={animationConfigs}
      >
        <View style={styles.sheetContainer}>
          <View style={styles.titleView}>
            <View style={{ margin: 10, marginLeft: 10 }}>
              <Text style={styles.titleText}>Confirmation to reset to default</Text>
            </View>
            <TouchableOpacity style={{ margin: 10, marginRight: 10 }} onPress={() => bottomSheetRef.current.close()}>
              <IconAwesome name="close" size={33} color={"#ccc"}/>
            </TouchableOpacity>
          </View>
          <View style={styles.middleView}>
            <Pressable style={styles.button} onPress={confirmReset}>
              <Text style={{ fontSize: 17, color: COLORS.white, fontWeight: 600 }}>Reset</Text>
            </Pressable>
            <Pressable style={[styles.button, { backgroundColor: COLORS.greyLighter }]} onPress={cancelReset}>
              <Text style={{ fontSize: 17, color: COLORS.white, fontWeight: 600 }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default ConfirmationBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  sheetContainer: {
    flex: 1,
    marginTop: 0,
    backgroundColor: COLORS.grey,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
  },
  titleView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderColor: COLORS.greyLighter,
    flexDirection: 'row',
  },
  titleLocationView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: COLORS.lightGrey,
    flexDirection: 'row',
    margin: 10, 
    marginLeft: 15,
    marginBottom: 0,
    gap: 15,
    width: '100%',
    marginRight: 150,
  },
  titleText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',

  },
  titleLocationText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 12,
    textAlign: 'center',
    maxWidth: '80%'
  },
  modalView: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  closeParentView: {
    height: Dimensions.get('window').height * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.grey,
  },
  shadowView: {
    shadowColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  bottomCloseContainer: {
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingBottom: 18,
  },
  closeText: {
    fontWeight: 'bold',
    fontSize: 21,
    color: COLORS.white
  },
  button: {
    borderRadius: 20,
    backgroundColor: COLORS.lightGrey,
    backgroundColor: COLORS.red,
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    gap: 10
  },
  regText: {
    color: COLORS.white,
    fontSize: 17
  },
  sliderView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
});





