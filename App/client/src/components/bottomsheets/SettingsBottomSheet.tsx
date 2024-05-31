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
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFooter, BottomSheetTextInput, useBottomSheetTimingConfigs } from "@gorhom/bottom-sheet";
import { COLORS } from '../../constants/index.tsx';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const SettingsBottomSheet = ({ children, snapIndex, setSnapIndex }: Props & { snapIndex: number }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const snapPoints = useMemo(() => ['75%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setSnapIndex(index);
  }, []);

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 400,
  });

  const handleUpdate = () => {
    setModalVisible(true);
  };

  const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
        closeOnPress={true}
        enableTouchThrough={true}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
			/>
		),
		[]
	);

  const renderFooter = useCallback(
    props => (
      <BottomSheetFooter {...props} inset={550}>
        <View style={[styles.closeParentView, styles.shadowView]}>
          <TouchableOpacity onPress={handleUpdate} style={styles.bottomCloseContainer}>
            <Text style={styles.closeText}>Confirm</Text> 
          </TouchableOpacity>
        </View>
      </BottomSheetFooter>
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
        handleIndicatorStyle={{ backgroundColor: '#fff', width: 50, height: 5 }}
        backgroundStyle={{  backgroundColor: 'transparent' }} 
        backdropComponent={renderBackdrop}
        footerComponent={renderFooter}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode='adjustResize'
        animationConfigs={animationConfigs}
      >
        <View style={styles.sheetContainer}> 
          <View style={styles.titleLocationView}>
            <View>
              <View style={{ padding: 3, borderRadius: 10, backgroundColor: COLORS.green }}>
                <Icon 
                  name={'location-sharp'} 
                  size={25} 
                  color={COLORS.white} 
                />
              </View>
            </View>
            <View style={styles.locationAndAddressView}>
              <Text 
                style={[styles.titleLocationText, { color: '#fff', fontSize: 14 }]} 
                numberOfLines={1} 
                ellipsizeMode="tail"
              >
                WPM
              </Text>
              <Text 
                style={[styles.titleLocationText, { color: '#fff', fontWeight: 500 }]} 
                numberOfLines={1} 
                ellipsizeMode="tail"
              >
                15
              </Text>
            </View>
          </View>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Settings</Text>
            <TouchableOpacity style={{ margin: 10, marginRight: 10, marginTop: 5, }} onPress={() => bottomSheetRef.current.close()}>
              <Icon name="close-outline" size={40} color={COLORS.white}/>
            </TouchableOpacity>
          </View>
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: COLORS.lightGrey,
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
    margin: 10, 
    marginLeft: 15, 
    marginTop: 5,
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
});




