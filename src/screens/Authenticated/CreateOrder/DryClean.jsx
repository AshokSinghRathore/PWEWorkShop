import {
  Alert,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  LogBox,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToTempCartDryClean,
  removeFromTempCartDryClean,
  updateItemFromTempCartDryClean,
} from '../../../feature/all-feature/feature-tempcart';
import Entypo from 'react-native-vector-icons/Entypo';
import DryCustomInput from '../../../components/DryClean/DryCustomInput';
import CustomWalletLabel from '../../../components/DryClean/CustomWalletLabel';
import CustomButton from '../../../components/DryClean/CustomButton';
import ConcernLabelButton from '../../../components/DryClean/ConcernLabelButton';
import firestore from '@react-native-firebase/firestore';
import LoadingOverlay from '../../../components/UI/LoadingOverlay';
import {AppColors as color} from '../../../constants/color';
import CustomDropdown from '../../../components/CustomDropdown';
import Toast from 'react-native-toast-message';
import {
  setDryCleanCloth,
  setDryCleanType,
} from '../../../feature/all-feature/feature-dataDryClean';
import CustomText from '../../../components/UI/CustomText';

const DryClean = ({navigation}) => {
  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested inside plain ScrollViews',
  ]);
  const [DryCleanTypeValue, setDryCleanTypeValue] = useState();
  const [DryCleanClothTypeValue, setDryCleanClothTypeValue] = useState();
  const [Quantity, setQuantity] = useState('');
  const [scroll, setScroll] = useState(true);
  const Selector = useSelector(state => state.TempCartItems);

  const Dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [SquareFeet, setSquareFeet] = useState('');
  const DryCleanData = useSelector(state => state.DryCleanData);
  const [loading, setLoading] = useState(false);
  async function getDryCleanData() {
    if (DryCleanData?.cloth?.length > 0 && DryCleanData?.type?.length > 0) {
      return;
    }
    setLoading(true);
    try {
      const DryCleanClothResp = await firestore()
        .collection('AppConfigs')
        .doc('OrderValueConfig')
        .collection('DryCleanCloth')
        .get();

      const DryCleanTypeResp = await firestore()
        .collection('AppConfigs')
        .doc('OrderValueConfig')
        .collection('DryCleanType')
        .get();
      if (!DryCleanClothResp.empty) {
        const clothData = DryCleanClothResp.docs.map(e => {
          return {...e.data(), id: e.id};
        });
        Dispatch(setDryCleanCloth({clothData: clothData, fetched: true}));
      }

      if (!DryCleanTypeResp.empty) {
        const typeData = DryCleanTypeResp.docs.map(e => {
          return {...e.data(), id: e.id};
        });
        Dispatch(setDryCleanType({typeData: typeData, fetched: true}));
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something Went Wrong',
        text2: "Can't Fetch Necessary data",
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    getDryCleanData();
  }, []);

  useEffect(() => {
    if (Selector.DryClean.length > 0) {
      var pir = 0;
      for (i in Selector.DryClean) {
        pir += Selector.DryClean[i].price;
      }
      setPrice(pir);
    }
  }, []);

  function DryCleanAddMore() {
    if (DryCleanTypeValue && Quantity && DryCleanClothTypeValue) {
      const isCarpet = DryCleanClothTypeValue.isCarpet || false;
      if (!isCarpet) {
        const existingDataIndex = Selector.DryClean.findIndex(
          olditem =>
            olditem.DryCleanTypeValue === DryCleanTypeValue.label &&
            olditem.DryCleanClothTypeValue === DryCleanClothTypeValue.label,
        );

        if (existingDataIndex != -1) {
          Dispatch(updateItemFromTempCartDryClean(existingDataIndex, Quantity));
          setPrice(price + DryCleanClothTypeValue.price * Quantity);
          setDryCleanClothTypeValue(null);
          setDryCleanTypeValue(null);
          setQuantity('');
          return;
        }
      } else {
        const existingDataIndex = Selector.DryClean.findIndex(olditem => {
          if (olditem.isCarpet) {
            return (
              olditem.DryCleanTypeValue === DryCleanTypeValue.label &&
              olditem.DryCleanClothTypeValue === DryCleanClothTypeValue.label &&
              olditem.Sqft === SquareFeet
            );
          }
        });

        if (existingDataIndex != -1) {
          const carpet_price = eval(
            SquareFeet * DryCleanClothTypeValue.price * Quantity,
          );
          Dispatch(updateItemFromTempCartDryClean(existingDataIndex, Quantity));
          setPrice(price + carpet_price);
          setDryCleanClothTypeValue(null);
          setDryCleanTypeValue(null);
          setQuantity('');
          setSquareFeet('');
          return;
        }
      }

      var obj = {
        Date: new Date().toISOString(),
        DryCleanClothTypeValue: DryCleanClothTypeValue.label,
        DryCleanTypeValue: DryCleanTypeValue.label,
        Quantity: Quantity,
        isCarpet: isCarpet,
      };
      if (obj.isCarpet) {
        if (SquareFeet) {
          obj['price'] = eval(
            SquareFeet * DryCleanClothTypeValue.price * Quantity,
          );
          obj['Sqft'] = SquareFeet;
          obj['perSqftPrice'] = DryCleanClothTypeValue.price;
          setPrice(price + obj.price);
          setSquareFeet('');
        } else {
          return Alert.alert(
            'Incomplete Details',
            'Please Select All the dropdowns and fill the inputs then press add more',
            2,
          );
        }
      } else {
        obj['price'] = DryCleanClothTypeValue.price * Quantity;

        setPrice(price + DryCleanClothTypeValue.price * Quantity);
      }

      Dispatch(addToTempCartDryClean(obj));
      setDryCleanClothTypeValue(null);
      setDryCleanTypeValue(null);
      setQuantity('');
    } else {
      Alert.alert(
        'Incomplete Details',
        'Please Select All the dropdowns and fill the inputs then press add more',
      );
    }
  }

  // custom modal
  const ClothTypemodalizeRef = useRef(null);
  const DryCleanTypemodalizeRef = useRef(null);

  // Function to open the modal
  const openModalClothType = () => {
    ClothTypemodalizeRef.current?.open();
  };
  const openModalDryCleanType = () => {
    DryCleanTypemodalizeRef.current?.open();
  };

  return (
    <>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <>
          <SafeAreaView style={DashboardStyles.container}>
            <ScrollView scrollEnabled={scroll}>
              <ConcernLabelButton
                label={'Dry Clean'}
                customStyle={{
                  backgroundColor: color.secondary,
                  width: '89%',
                  alignSelf: 'center',
                }}
              />
              <View style={DryCleanStyle.addContainer}>
                <CustomWalletLabel
                  label={'Choose from below'}
                  labelColor={'black'}
                />
                <DryCustomInput
                  placeHolder={'Choose'}
                  condition={DryCleanClothTypeValue}
                  onPress={openModalClothType}
                  label={'Cloth Type'}
                  value={
                    DryCleanClothTypeValue
                      ? DryCleanClothTypeValue.label < 40
                        ? DryCleanClothTypeValue.label
                        : DryCleanClothTypeValue.label.substring(0, 30)
                      : {}
                  }
                />
                <DryCustomInput
                  label={'DryClean Type'}
                  condition={DryCleanTypeValue}
                  onPress={openModalDryCleanType}
                  placeHolder={'Choose'}
                  value={
                    DryCleanTypeValue
                      ? DryCleanTypeValue.label.length < 11
                        ? DryCleanTypeValue.label
                        : DryCleanTypeValue.label.substring(0, 8) + '...'
                      : {}
                  }
                />
                <View
                  style={[
                    CustomIroningInputsStyle.subContainer,
                    {marginLeft: 20},
                  ]}>
                  <CustomText
                    customStyle={[
                      CustomIroningInputsStyle.commonText,
                      {fontSize: 16},
                    ]}>
                    Quantity :
                  </CustomText>
                  <View style={CustomIroningInputsStyle.quantityContainer}>
                    <Pressable
                      onPress={() => {
                        setQuantity(
                          Quantity > 1
                            ? (parseInt(Quantity) - 1).toString()
                            : '',
                        );
                      }}
                      style={CustomIroningInputsStyle.buttonContainer}>
                      <Entypo
                        color={'red'}
                        size={19}
                        name="circle-with-minus"
                      />
                    </Pressable>
                    <TextInput
                      keyboardType="numeric"
                      value={Quantity}
                      onChangeText={e => {
                        if (/^\d+$/.test(e) || e === '') {
                          setQuantity(e);
                        } else {
                          Alert.alert(
                            'Invalid Input',
                            'Please enter only numeric values.',
                          );
                        }
                      }}
                      style={{
                        color: 'black',
                        fontFamily: 'Poppins-Medium',
                        fontSize: 15,
                        width: 35,
                      }}
                    />
                    <Pressable
                      onPress={() => {
                        setQuantity(
                          Quantity ? (parseInt(Quantity) + 1).toString() : '1',
                        );
                      }}
                      style={CustomIroningInputsStyle.buttonContainer}>
                      <AntDesign color={'green'} size={15} name="pluscircle" />
                    </Pressable>
                  </View>
                </View>
                {DryCleanClothTypeValue != undefined &&
                  DryCleanClothTypeValue.isCarpet && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: -15,
                      }}>
                      <DryCustomInput
                        input
                        label={'Sqft'}
                        placeHolder={''}
                        value={SquareFeet}
                        onChange={e => {
                          if (/^\d+$/.test(e) || e === '') {
                            setSquareFeet(e);
                          } else {
                            Alert.alert(
                              'Invalid Input',
                              'Please enter only numeric values.',
                            );
                          }
                        }}
                      />
                      <Icon
                        name="help-outline"
                        size={20}
                        color="black"
                        style={{marginTop: 7}}
                        onPress={() => {
                          Alert.alert(
                            'Please Provide Square Foot Area',
                            'Please Calculate your carpet area by multiplying its width in foot and height in foot. And then enter the area',
                          );
                        }}
                      />
                    </View>
                  )}
              </View>
              <View style={styles.container}>
                <TouchableOpacity
                  onPress={DryCleanAddMore}
                  style={styles.backgroundView}
                />

                <TouchableOpacity
                  onPress={DryCleanAddMore}
                  style={styles.textView}>
                  <Text onPress={DryCleanAddMore} style={styles.text}>
                    Add {'      '}
                  </Text>
                </TouchableOpacity>
              </View>
              {Selector.DryClean.length > 0 && (
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
                      borderRadius: 4,
                    },
                    Selector.DryClean.length > 2 && {height: 200},
                  ]}
                  data={Selector.DryClean}
                  keyExtractor={item => item.Date}
                  renderItem={({item, index}) => {
                    const cloth =
                      item.DryCleanClothTypeValue.length > 20
                        ? item.DryCleanClothTypeValue.substring(0, 20) + '..'
                        : item.DryCleanClothTypeValue;
                    const dryCleanType =
                      item.DryCleanTypeValue.length > 10
                        ? item.DryCleanTypeValue.substring(0, 6) + '..'
                        : item.DryCleanTypeValue;

                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingVertical: 5,
                        }}>
                        <Text
                          style={{
                            color: color.tertiary,
                            fontFamily: 'Poppins-Medium',
                            fontSize: 15,
                            width: '33%',
                          }}>
                          {cloth}{' '}
                          {item.isCarpet && '\n(' + item.Sqft + ') Sqft'}
                        </Text>
                        <Text
                          style={{
                            color: color.tertiary,
                            fontFamily: 'Poppins-Medium',
                            fontSize: 15,
                            width: '33%',
                            left: -20,
                          }}>
                          {dryCleanType}
                        </Text>
                        <Text
                          style={[
                            {
                              color: color.tertiary,
                              fontFamily: 'Poppins-Medium',
                              fontSize: 15,
                              textAlign: 'right',
                              left: -30,
                            },
                            index === Selector.DryClean.length - 1 && {
                              marginBottom: 5,
                            },
                          ]}>
                          {item.Quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            if (price <= 0) {
                              setPrice(0.0);
                            } else {
                              if (item.isCarpet) {
                                const carpet_price = eval(
                                  item.Sqft * item.perSqftPrice * item.Quantity,
                                );
                                setPrice(price - carpet_price);
                              } else {
                                setPrice(price - item.price);
                              }
                            }
                            Dispatch(removeFromTempCartDryClean(item));
                          }}
                          style={{
                            backgroundColor: '#D2042D',
                            padding: 3,
                            borderRadius: 10,
                            bottom: 3,

                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={[
                              {
                                color: 'white',
                                fontFamily: 'Poppins-Medium',
                                fontSize: 15,
                                textAlign: 'right',
                              },
                              index === Selector.DryClean.length - 1 && {
                                marginBottom: 5,
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
              <CustomText
                customStyle={{
                  marginHorizontal: 10,
                  marginTop: 5,
                  fontSize: 20,
                  color: 'black',
                }}>
                Total Price :- ₹ {price}
              </CustomText>

              <CustomButton
                title={'Next'}
                onPress={() => {
                  if (DryCleanData.fetched) {
                    if (Selector.DryClean.length < 1) {
                      return Alert.alert(
                        'Please Select at least 1 item',
                        'Add one item in your cart',
                      );
                    }
                    navigation.navigate('DryCleanDatePicker', {
                      price: price,
                    });
                  } else {
                    Alert.alert(
                      'Not able To fetched necessary data',
                      'Please Try again',
                      [
                        {
                          text: 'Retry',
                          onPress: getDryCleanData,
                        },
                        {
                          text: 'cancel',
                        },
                      ],
                    );
                  }
                }}
                bgColor={'#138808'}
                textColor={'white'}
                containerStyle={{
                  alignSelf: 'center',
                  width: '90%',
                  height: 50,
                }}
              />
            </ScrollView>
            <CustomDropdown
              access={'label'}
              customDropdownRef={ClothTypemodalizeRef}
              data={DryCleanData?.cloth || []}
              onPress={item => {
                setDryCleanClothTypeValue(item);
              }}
              label={'Select the cloth type'}
              anotherAccess={'price'}
              keyAccess={'id'}
              noCenter
            />
            <CustomDropdown
              access={'label'}
              customDropdownRef={DryCleanTypemodalizeRef}
              data={DryCleanData?.type || []}
              onPress={item => {
                setDryCleanTypeValue(item);
              }}
              label={'Select the Dry Clean type'}
              keyAccess={'id'}
            />
          </SafeAreaView>
        </>
      )}
    </>
  );
};

export default DryClean;

const DryCleanStyle = StyleSheet.create({
  addContainer: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#349BB1',
    margin: 20,
  },
  addSubContainer: {
    flexDirection: 'row',
    // justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 20,
    alignItems: 'center',
  },
});

export const Styles = StyleSheet.create({
  container: {},
  dropdown: {
    height: 50,
    borderColor: 'gray',

    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',

    backgroundColor: 'red',
    left: 22,
    top: 8,

    // zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: 'yellow',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'yellow',
    // marginLeft: 10,
    fontFamily: 'Poppins-SemiBold',
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundView: {
    position: 'absolute',
    top: 0,
    right: 10,
    bottom: 0,
    width: '27%',
    backgroundColor:color.tertiary,
    marginRight: 10,
    borderRadius: 10,
    alignItems:"center",
    justifyContent:"center"
  },
  textView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    flex: 1,
    padding: 10,
    right: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins-Medium',
    textAlign:"center"
  },
});

export const CustomIroningInputsStyle = StyleSheet.create({
  container: {
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderBlockColor: color.tertiary,
    borderTopColor: color.tertiary,
    padding: 10,
  },

  commonText: {
    marginTop: 0,
    padding: 0,
    fontSize: 18,
    color: 'black',
  },
  subContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityContainer: {
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    height: 40,
    marginLeft: 5,
    width: 80,
    paddingHorizontal: 5,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    fontFamily: 'Poppins-Medium',
  },
});
export const DashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 4,
    backgroundColor: 'rgba(16,220,195,.64)',
  },
  headerText: {
    fontSize: 26,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -2, height: 1},
    textShadowRadius: 10,
    textAlign: 'center',
    paddingVertical: 2,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  footer: {
    height: 50,
    backgroundColor: 'white',
  },
  subViewContainer: {
    width: '100%',
    borderTopWidth: 4,
    borderTopColor: color.tertiary,
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
});
