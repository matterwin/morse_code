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
import Slider from '@react-native-community/slider';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const SettingsBottomSheet = ({ 
  children, 
  snapIndex, 
  setSnapIndex, 
  wpm, 
  setWpm, 
  setSnapIndexForConfirmation,
  bottomSheetRef,
  setModalVisible,
  timeunit,
  setTimeunit,
}: Props & { snapIndex: number }) => {
  const calcWpm = (value) => {
    setWpm(value);
  };

  const snapPoints = useMemo(() => ['60%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setSnapIndex(index);
  }, []);

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 400,
  });

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

  useEffect(() => {
    const timePerUnit = (60 / (wpm * 50)) * 1000;
    const tu = Math.round(timePerUnit);
    setTimeunit(tu);
  }, [wpm]);
 
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
        handleIndicatorStyle={{ backgroundColor: '#fff', width: 50, height: 5 }}
        backgroundStyle={{  backgroundColor: 'transparent' }} 
        backdropComponent={renderBackdrop}
        animationConfigs={animationConfigs}
      >
        <View style={styles.sheetContainer}>
          <View style={styles.titleView}>
            <View style={{ margin: 10, marginLeft: 10 }}>
              <Text style={styles.titleText}>Settings</Text>
            </View>
            <TouchableOpacity style={{ margin: 10, marginRight: 10 }} onPress={() => bottomSheetRef.current.close()}>
              <IconAwesome name="close" size={33} color={"#ccc"}/>
            </TouchableOpacity>
          </View>
          <BottomSheetScrollView style={{flex:1}}>
            <View style={styles.buttonRow}>
              <Pressable style={styles.button} onPress={() => setSnapIndexForConfirmation(0)}>
                <Text style={{ fontSize: 17, color: COLORS.white, fontWeight: 600 }}>Reset</Text>
              </Pressable>
              <Pressable style={[styles.button, { backgroundColor: COLORS.greyLighter }]}>
                <Text style={{ fontSize: 17, color: COLORS.white, fontWeight: 600 }}>WMP: {wpm}</Text>
              </Pressable>
            </View>
            <View style={styles.middleView}>
              <View style={styles.sliderView}>
                <Slider
                  style={{ height: 40, width: '100%', marginLeft: 10, marginRight: 10 }}
                  minimumValue={5}
                  maximumValue={35}
                  minimumTrackTintColor={COLORS.yellow}
                  maximumTrackTintColor={COLORS.lightGrey}
                  onValueChange={(value) => calcWpm(value)}
                  step={1}
                  value={wpm}
                />
              </View>
              <View style={{ backgroundColor: COLORS.greyLighter, padding: 10, borderRadius: 10, width: '100%' }}>
                <View style={styles.infoView}>
                  <Text style={[styles.regText, { marginBottom: 10 }]}>1 time unit </Text>
                  <Text style={[styles.regText, { marginBottom: 10 }]}>~{timeunit} ms</Text>
                </View>
                <View style={styles.infoView}>
                  <Text style={styles.regText}>Intra-character pause</Text>
                  <Text style={[styles.regText]}>{timeunit} ms</Text>
                </View>
                <View style={styles.infoView}>
                  <Text style={styles.regText}>Inter-character pause</Text>
                  <Text style={[styles.regText]}>{timeunit*3} ms</Text>
                </View>
                <View style={styles.infoView}>
                  <Text style={styles.regText}>Word pause</Text>
                  <Text style={[styles.regText]}>{timeunit*7} ms</Text>
                </View>
              </View>
              <View style={{ marginTop: 20, backgroundColor: COLORS.greyLighter, padding: 10, borderRadius: 10, width: '100%' }}>
                <View style={styles.infoView}>
                  <Text style={[styles.regText]}>dot    •</Text>
                  <Text style={[styles.regText]}>{timeunit} ms</Text>
                </View>
                <View style={styles.infoView}>
                  <Text style={styles.regText}>dash  —</Text>
                  <Text style={[styles.regText]}>{timeunit*3} ms</Text>
                </View>
              </View>
            </View>
          </BottomSheetScrollView>
        </View>
      </BottomSheet>
    </View>
  );
};

export default SettingsBottomSheet;

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
    borderColor: COLORS.greyLighter,
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
    textAlign: 'center'
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
  locationAndAddressView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '90%',
  },
  button: {
    borderRadius: 20,
    backgroundColor: COLORS.lightGrey,
    backgroundColor: COLORS.red,
    padding: 10,
    borderRadius: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    marginHorizontal: 10,
    gap: 10
  },
  middleView: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
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
  infoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});




