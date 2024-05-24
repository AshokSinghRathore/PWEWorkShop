import {
  Alert,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
  LogBox
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import {DashboardStyles} from './DryClean';
import LoadingOverlay from '../../../components/UI/LoadingOverlay';
import { fontFamily } from './DryCleanDatePicker';
import CustomDropdown from '../../../components/CustomDropdown';
import CustomIroningInputs from '../../../components/Ironing/CustomIroningInput';
import ConcernLabelButton from '../../../components/UI/ConcernLabelButton';
import { AppColors as color } from '../../../constants/color';
import { addToTempCartIroning, removeFromTempCartIroning, updateItemFromTempCartIroning } from '../../../feature/all-feature/feature-tempcart';
import { setIroningCharge } from '../../../feature/all-feature/feature-dataIroning';
const IronScreen = ({navigation}) => {
  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested inside plain ScrollViews',

    'Possible Unhandled Promise Rejection',
    'Warning: This synthetic event is reused for performance reasons.',
  ]);
  const [IroningPressType0to5Age, setIroningPressType0to5Age] = useState(null);
  const [IroningPressType5to15Age, setIroningPressType5to15Age] =
    useState(null);
  const [IroningPressType15PlusAge, setIroningPressType15PlusAge] =
    useState(null);
  const [scroll, setScroll] = useState(true);
  const [Quantity0to5Age, setQuantity0to5Age] = useState('');
  const [Quantity5to15Age, setQuantity5to15Age] = useState('');
  const [Quantity15PlusAge, setQuantity15PlusAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [SpecailClothQuantity, setSpecailClothQuantity] = useState('');
  const [SpecialClothType, setSpecialClothType] = useState(null);
  const [SpecailPressType, setSpecailPressType] = useState(null);
  const PressTypeRef1 = useRef();
  const PressTypeRef2 = useRef();
  const PressTypeRef3 = useRef();
  const clothTypes = [
    {id: 1, label: 'Saree', value: 'Saree'},
    {id: 2, label: 'Coat Suit', value: 'Coat Suit'},
    {
      id: 3,
      label: 'Lehanga/Sharara/Premium Suit',
      value: 'Lehanga/Sharara/Premium Suit',
    },
    {id: 4, label: 'Bedsheets', value: 'Bedsheets'},
    {id: 5, label: 'Blankets', value: 'Blankets'},
    {id: 6, label: 'Others', value: 'Others'},
  ];
  const PressTypeSpecialCloth = useRef();
  const ClothTypeSpecialCloth = useRef();

  const PressType = [
    {id: 1, label: 'Normal', value: 'Normal'},
    {id: 2, label: 'Standing Steam Press', value: 'Standing Steam Press'},
    {id: 3, label: 'Germ Kill disinfectant', value: 'Germ Kill disinfectant'},
  ];

  const openModalSpecialClothPressType = () => {
    PressTypeSpecialCloth.current?.open();
  };
  const openModalSpecialClothType = () => {
    ClothTypeSpecialCloth.current?.open();
  };
  const openModalPressType1 = () => {
    PressTypeRef1.current?.open();
  };
  const openModalPressType2 = () => {
    PressTypeRef2.current?.open();
  };
  const openModalPressType3 = () => {
    PressTypeRef3.current?.open();
  };
  const TempCart = useSelector(state => state.TempCartItems);
  const Dispatch = useDispatch();
  function AddMore() {
    const Iron0to5Age =
      Boolean(Quantity0to5Age) && Boolean(IroningPressType0to5Age);

    const Iron5to15Age =
      Boolean(Quantity5to15Age) && Boolean(IroningPressType5to15Age);
    const Iron15PlusAge =
      Boolean(Quantity15PlusAge) && Boolean(IroningPressType15PlusAge);
    const SpecialCloth =
      Boolean(SpecailClothQuantity) &&
      Boolean(ClothTypeSpecialCloth) &&
      Boolean(SpecailPressType);
    if (Iron0to5Age || Iron5to15Age || Iron15PlusAge || SpecialCloth) {
      function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      var Date1 = new Date();
      Date1.setHours(new Date().getHours() + getRandomNumber(1, 3));
      var Date2 = new Date();
      Date2.setHours(new Date().getHours() + getRandomNumber(4, 6));
      var Date3 = new Date();
      Date3.setHours(new Date().getHours() + getRandomNumber(7, 11));
      var Date4 = new Date();
      Date4.setHours(new Date().getHours() + getRandomNumber(11, 12));
      var obj1 = Iron0to5Age
        ? {
            ClothType: Iron0to5Age && '0-5',
            Quantity: Quantity0to5Age,
            PressType: IroningPressType0to5Age.value,
            Date: Date1.toISOString(),
          }
        : undefined;

      var obj2 = Iron5to15Age
        ? {
            ClothType: Iron5to15Age && '5-15',
            Quantity: Quantity5to15Age,
            PressType: IroningPressType5to15Age.value,
            Date: Date2.toISOString(),
          }
        : undefined;
      var obj3 = Iron15PlusAge
        ? {
            ClothType: Iron15PlusAge && '15+',
            Quantity: Quantity15PlusAge,
            PressType: IroningPressType15PlusAge.value,
            Date: Date3.toISOString(),
          }
        : undefined;
      var obj4 = SpecialCloth
        ? {
            Quantity: SpecailClothQuantity,
            PressType: SpecailPressType.value,
            ClothType: SpecialClothType.value,
            Date: Date4.toISOString(),
            isSpecial: true,
          }
        : undefined;
      if (obj1) {
        const existingIndex = TempCart.Ironing.findIndex(
          olditem =>
            olditem.PressType === obj1.PressType &&
            olditem.ClothType === obj1.ClothType,
        );

        if (existingIndex != -1) {
          Dispatch(updateItemFromTempCartIroning(existingIndex, obj1.Quantity));
        } else {
          Dispatch(addToTempCartIroning(obj1));
        }
      }
      if (obj2) {
        const existingIndex = TempCart.Ironing.findIndex(
          olditem =>
            olditem.PressType === obj2.PressType &&
            olditem.ClothType === obj2.ClothType,
        );
        if (existingIndex != -1) {
          Dispatch(updateItemFromTempCartIroning(existingIndex, obj2.Quantity));
        } else {
          Dispatch(addToTempCartIroning(obj2));
        }
      }
      if (obj3) {
        const existingIndex = TempCart.Ironing.findIndex(
          olditem =>
            olditem.PressType === obj3.PressType &&
            olditem.ClothType === obj3.ClothType,
        );

        if (existingIndex != -1) {
          Dispatch(updateItemFromTempCartIroning(existingIndex, obj3.Quantity));
        } else {
          Dispatch(addToTempCartIroning(obj3));
        }
      }
      if (obj4) {
        const existingIndex = TempCart.Ironing.findIndex(
          olditem =>
            olditem.PressType === obj4.PressType &&
            olditem.ClothType === obj4.ClothType,
        );
        if (existingIndex != -1) {
          Dispatch(updateItemFromTempCartIroning(existingIndex, obj4.Quantity));
        } else {
          Dispatch(addToTempCartIroning(obj4));
        }
      }
      setIroningPressType0to5Age(null);
      setIroningPressType5to15Age(null);
      setIroningPressType15PlusAge(null);
      setQuantity0to5Age('');
      setQuantity5to15Age('');
      setQuantity15PlusAge('');
      setSpecialClothType(null);
      setSpecailPressType(null);
      setSpecailClothQuantity('');
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Clothes added. Please Continue',
        text1Style: {
          fontFamily: fontFamily.regular,
          color: 'black',
        },
        text2Style: {
          fontFamily: fontFamily.regular,
          color: 'grey',
        },
        position: 'top',
        swipeable: true,
      });
    } else {
      Alert.alert(
        'Incomplete Details',
        'Please Select dropdowns and fill the inputs then press add ',
      );
    }
  }
  function Delete(item) {
    Dispatch(removeFromTempCartIroning(item));
  }

  const IroningCharges = useSelector(state => state.IroningCharges);

  async function getIroningData() {
    // if (IroningCharges.fetched) {
    //   return;
    // }
    setLoading(true);
    try {
      const ironingResp = await firestore()
        .collection('AppConfigs')
        .doc('OrderValueConfig')
        .collection('Ironing')
        .get();

      const specialClothResp = await firestore()
        .collection('AppConfigs')
        .doc('OrderValueConfig')
        .collection('IroningSpecialCloth')
        .get();

      if (!ironingResp.empty) {
        let IroningInstant = ironingResp.docs.find(
          e => e.id == 'IroningInstant',
        );
        let IroningDelayed = ironingResp.docs.find(
          e => e.id == 'IroningDelayed',
        );
        let IroningNormal = ironingResp.docs.find(e => e.id == 'IroningNormal');

        let specialClothData = specialClothResp.docs.map(e => {
          return {...e.data(), id: e.id};
        });
        Dispatch(
          setIroningCharge({
            IroningInstant: {...IroningInstant.data(), id: IroningInstant.id},
            IroningDelayed: {...IroningDelayed.data(), id: IroningDelayed.id},
            IroningNormal: {...IroningNormal.data(), id: IroningNormal.id},
            specialCloth: specialClothData,
          }),
        );
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something Went Wrong',
        text2: "Can't Fetch Necessary data",
      });
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getIroningData();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <>

          <SafeAreaView style={DashboardStyles.container}>
            <ScrollView scrollEnabled={scroll}>
              <ConcernLabelButton
                label={'Ironing'}
                customStyle={{
                  backgroundColor: color.secondary,
                  alignSelf: 'center',
                  height: 50,
                  width: '89%',
                }}
              />

              <View
                style={{
                  marginTop: 10,
                }}>
                <CustomIroningInputs
                  noBottom
                  dropValue1={IroningPressType0to5Age}
                  inputValue={Quantity0to5Age}
                  onChangeText={e => {
                    if (/^\d+$/.test(e) || e === '') {
                      setQuantity0to5Age(e);
                    } else {
                      Alert.alert(
                        'Invalid Input',
                        'Please enter only numeric values.',
                      );
                    }
                  }}
                  header={'Clothes Upto 5 years Age'}
                  label1={'No. of Cloths : '}
                  label2={'Type of Press : '}
                  openDropDown1={openModalPressType1}
                  onAdd={AddMore}
                />
                <CustomIroningInputs
                  dropValue1={IroningPressType5to15Age}
                  inputValue={Quantity5to15Age}
                  onChangeText={e => {
                    if (/^\d+$/.test(e) || e === '') {
                      setQuantity5to15Age(e);
                    } else {
                      Alert.alert(
                        'Invalid Input',
                        'Please enter only numeric values.',
                      );
                    }
                  }}
                  header={'Clothes 5 to 15 years Age'}
                  label1={'No. of Cloths : '}
                  label2={'Type of Press : '}
                  noBottom
                  openDropDown1={openModalPressType2}
                  onAdd={AddMore}
                />
                <CustomIroningInputs
                  dropValue1={IroningPressType15PlusAge}
                  inputValue={Quantity15PlusAge}
                  onChangeText={e => {
                    if (/^\d+$/.test(e) || e === '') {
                      setQuantity15PlusAge(e);
                    } else {
                      Alert.alert(
                        'Invalid Input',
                        'Please enter only numeric values.',
                      );
                    }
                  }}
                  header={'Clothes for 15+ years of age'}
                  label1={'No. of Cloths : '}
                  label2={'Type of Press : '}
                  noBottom
                  openDropDown1={openModalPressType3}
                  onAdd={AddMore}
                />
                <CustomIroningInputs
                  onAdd={AddMore}
                  inputValue={SpecailClothQuantity}
                  onChangeText={e => {
                    if (/^\d+$/.test(e) || e === '') {
                      setSpecailClothQuantity(e);
                    } else {
                      Alert.alert(
                        'Invalid Input',
                        'Please enter only numeric values.',
                      );
                    }
                  }}
                  header={'Any Special Cloth ?'}
                  label1={'No. of Cloths : '}
                  label2={'Type of Cloth : '}
                  label3={'Type of Press : '}
                  dropValue1={SpecialClothType}
                  dropValue2={SpecailPressType}
                  openDropDown1={openModalSpecialClothType}
                  openDropDown2={openModalSpecialClothPressType}
                />
              </View>

              {TempCart.Ironing.length > 0 && (
                <FlatList
                  nestedScrollEnabled
                  style={[
                    {
                      height: 100,
                      borderWidth: 1,
                      borderColor: color.tertiary,
                      marginHorizontal: 5,
                      marginTop: 10,
                      marginBottom: 5,
                      padding: 10,
                    },
                    TempCart.Ironing.length > 2 && {height: 200},
                  ]}
                  data={TempCart.Ironing}
                  keyExtractor={item => item.Date}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingVertical: 5,
                          marginBottom: 5,
                        }}>
                        {item.ClothType && (
                          <Text
                            style={{
                              color: 'black',
                              fontFamily: fontFamily.regular,
                              fontSize: 15,
                              width: '33%',
                            }}>
                            {item.ClothType}
                          </Text>
                        )}
                        {item.PressType && (
                          <Text
                            style={{
                              color: 'black',
                              fontFamily: fontFamily.regular,
                              fontSize: 15,
                              width: '33%',
                            }}>
                            {item.PressType}
                          </Text>
                        )}
                        {item.Quantity && (
                          <Text
                            style={[
                              {
                                color: 'black',
                                fontFamily: fontFamily.regular,
                                fontSize: 15,
                                textAlign: 'right',
                                left: -20,
                                width: 40,
                              },
                              index === TempCart.Ironing.length - 1 && {
                                marginBottom: 5,
                              },
                            ]}>
                            {item.Quantity}
                          </Text>
                        )}
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#D2042D',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            borderRadius: 10,
                            padding: 3,
                          }}
                          onPress={() => Delete(item)}>
                          <Text
                            style={[
                              {
                                color: 'white',
                                fontFamily: fontFamily.regular,
                                fontSize: 13,
                              },
                            ]}>
                            Delete
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  onScrollBeginDrag={() => setScroll(false)}
                  onScrollEndDrag={() => setScroll(true)}
                />
              )}

              <TouchableOpacity
                onPress={() => {
                  if (IroningCharges.fetched) {
                    if (TempCart.Ironing.length > 0) {
                      navigation.navigate('DatePicker');
                    } else {
                      Alert.alert(
                        'Please add at least one item',
                        'To continue you need to add one item at least',
                      );
                    }
                  } else {
                    Alert.alert(
                      'Not able To fetched necessary data',
                      'Please Try again',
                      [
                        {
                          text: 'Retry',
                          onPress: getIroningData,
                        },
                        {
                          text: 'cancel',
                        },
                      ],
                    );
                  }
                }}
                style={{
                  backgroundColor: '#138808',
                  borderRadius: 8,
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: 40,
                }}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                    fontFamily: 'Roboto-Medium',
                    margin: 10,
                  }}>
                  Next
                </Text>
              </TouchableOpacity>


            </ScrollView>

            <CustomDropdown
              customDropdownRef={PressTypeRef1}
              access={'value'}
              keyAccess={'id'}
              data={PressType}
              label={'Press Type'}
              noDataLine={'No Press Type'}
              onPress={e => setIroningPressType0to5Age(e)}
            />
            <CustomDropdown
              customDropdownRef={PressTypeRef2}
              access={'value'}
              keyAccess={'id'}
              data={PressType}
              label={'Press Type'}
              noDataLine={'No Press Type'}
              onPress={e => setIroningPressType5to15Age(e)}
            />

            <CustomDropdown
              customDropdownRef={PressTypeRef3}
              access={'value'}
              keyAccess={'id'}
              data={PressType}
              label={'Press Type'}
              noDataLine={'No Press Type'}
              onPress={e => setIroningPressType15PlusAge(e)}
            />

            <CustomDropdown
              customDropdownRef={PressTypeSpecialCloth}
              access={'value'}
              keyAccess={'id'}
              data={PressType}
              label={'Press Type'}
              noDataLine={'No Press Type'}
              onPress={e => setSpecailPressType(e)}
            />
            <CustomDropdown
              customDropdownRef={ClothTypeSpecialCloth}
              access={'value'}
              keyAccess={'id'}
              data={IroningCharges.specialCloth}
              label={'Cloth Type'}
              noDataLine={'No Clot Type'}
              onPress={e => setSpecialClothType(e)}
            />
          </SafeAreaView>
        </>
      )}
    </>
  );
};

export default IronScreen;
