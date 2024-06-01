import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  Platform,
  Alert,
  DeviceEventEmitter,
  ToastAndroid,
  PermissionsAndroid,
  Modal,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Feather from 'react-native-vector-icons/Feather';
import DashboardButton from '../../components/DashboardButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {setServicePinCode} from '../../feature/all-feature/feature-servicepincode';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import auth from '@react-native-firebase/auth';
import {clearCred} from '../../feature/all-feature/feature-cred';
import {removeItem} from '../../helpers/AsyncStorageFunctions';
import {
  checkPermission,
  checkPermissions,
} from '../../permission/checkPermission';
import {
  PERMISSIONS,
  RESULTS,
  openSettings,
  requestMultiple,
} from 'react-native-permissions';
import {
  requestPermission,
  requestPermissions,
} from '../../permission/RequestPermission';
import {BluetoothManager} from 'react-native-bluetooth-escpos-printer';
import ItemList from '../../components/UI/ItemList';
import {
  setBoundAddress,
  setName,
} from '../../feature/all-feature/feature-bluetooth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// permission
export async function checkAndGetPermission() {
  try {
    const isPermit = await checkPermission(
      PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
    );
    if (!isPermit) {
      const getPermission = await requestPermission(
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      );
      if (!getPermission) {
        // Alert.alert("Permission Error", "Permission Denied, This permission are required", [
        //   {
        //     text: "Change",
        //     onPress: () => openSettings(),
        //     style: "default"
        //   },
        //   {
        //     text: "Cancel"
        //   }
        // ]);
      }
    }
  } catch (error) {
    Alert.alert('Permission Error', error);
  }
}
export async function checkAndGetPermissions() {
  try {
    const isPermit = await checkPermissions([
      PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ]);
    if (!isPermit) {
      const getPermission = await requestPermissions([
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]);
      if (!getPermission) {
        // Alert.alert("Permission Error", "Permission Denied, This Permission is required", [
        //   {
        //     text: "Change",
        //     onPress: () => openSettings(),
        //     style: "default"
        //   }
        // ]);
      }
    }
  } catch (error) {
    Alert.alert('Permission Error', error);
  }
}

// ----

// bluetooth

const Dashboard = ({navigation}) => {
  const Cred = useSelector(state => state.Cred);
  const Dispatch = useDispatch();
  const [screenLoader, setScreenLoader] = useState(false);
  const ConnectedBluetoothDevice = useSelector(state => state.BluetoothSlice);

  async function getCall() {
    setScreenLoader(true);
    try {
      const pinCodeResp = await firestore()
        .collectionGroup('PinCodes')
        .where('syncCode', '==', Cred.syncCode)
        .get();
      const pinCodeRespExtract = pinCodeResp.docs.map(doc => {
        const allRef = doc.ref.path.split('/');
        return {
          ...doc.data(),
          State: Cred.State,
          City: Cred.City,
          Pincode: doc.data().pincode,
          pathRef: `States/${allRef[1]}/Cities/${allRef[3]}/PinCodes/${doc.id}`,
        };
      });
      const planePinCodes = pinCodeRespExtract.map(e => e.Pincode);

      Dispatch(
        setServicePinCode({
          planePinCodeArray: planePinCodes,
          servicePinCodeArray: pinCodeRespExtract,
        }),
      );

      await checkAndGetPermissions();
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Something Went Wrong',
        'Please Try Again Later or Login Again',
        [
          {
            text: 'Log Out',
            style: 'destructive',
            onPress: async () => {
              try {
                Dispatch(clearCred());
                await removeItem('token');
                await removeItem('uid');
                await auth().signOut();
              } catch (error) {}
            },
          },
          {
            text: 'Retry',
            isPreferred: true,
            style: 'default',
            onPress: getCall,
          },
        ],
      );
    }
    setScreenLoader(false);
  }

  useEffect(() => {
    getCall();
  }, []);

  // bluetooth
  const [bleOpend, setBleOpend] = useState(false);
  const [pairedDevices, setPairedDevices] = useState([]);
  const [foundDs, setFoundDs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    BluetoothManager.isBluetoothEnabled().then(
      enabled => {
        setLoading(false);
      },
      err => {
        err;
      },
    );
    if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
        rsp => {
          deviceAlreadPaired(rsp);
        },
      );
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_FOUND,
        rsp => {
          deviceFoundEvent(rsp);
        },
      );
      // DeviceEventEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
      //   setName('');
      //   setBoundAddress('');
      // });
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
        () => {
          ToastAndroid.show(
            'Device Not Support Bluetooth !',
            ToastAndroid.LONG,
          );
        },
      );
    }
  }, [deviceAlreadPaired, deviceFoundEvent, pairedDevices, scan]);

  const deviceAlreadPaired = useCallback(
    rsp => {
      var ds = null;
      if (typeof rsp.devices === 'object') {
        ds = rsp.devices;
      } else {
        try {
          ds = JSON.parse(rsp.devices);
        } catch (e) {}
      }
      if (ds && ds.length) {
        let pared = pairedDevices;
        if (pared.length < 1) {
          pared = pared.concat(ds || []);
        }
        setPairedDevices(pared);
      }
    },
    [pairedDevices],
  );

  const deviceFoundEvent = useCallback(
    rsp => {
      var r = null;
      try {
        if (typeof rsp.device === 'object') {
          r = rsp.device;
        } else {
          r = JSON.parse(rsp.device);
        }
      } catch (e) {
        // ignore error
      }

      if (r) {
        let found = foundDs || [];
        if (found.findIndex) {
          let duplicated = found.findIndex(function (x) {
            return x.address == r.address;
          });
          if (duplicated == -1) {
            found.push(r);
            setFoundDs(found);
          }
        }
      }
    },
    [foundDs],
  );

  const scanDevices = useCallback(() => {
    console.log('Scanning...');
    setLoading(true);
    BluetoothManager.scanDevices().then(
      s => {
        // const pairedDevices = s.paired;
        var found = s.found;
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        var fds = foundDs;
        if (found && found.length) {
          fds = found;
        }
        console.log(foundDs);
        setFoundDs(fds);
        setLoading(false);
      },
      er => {
        setLoading(false);
        console.log(er);
        Alert.alert(
          'Bluetooth Error',
          'Bluetooth not started or not supported. Please try again later',
          [
            {
              text: 'cancel',
            },
            {
              text: 'Retry',
              onPress: () => scanDevices(),
            },
          ],
        );
        {
        }
      },
    );
  }, [foundDs]);

  const scan = useCallback(() => {
    try {
      async function blueTooth() {
        const permissions = {
          title: 'Bluetooth Permission',
          message: 'Required for Bill Printing**',
          buttonNeutral: 'May Be Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        };

        const bluetoothConnectGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          permissions,
        );
        if (bluetoothConnectGranted === PermissionsAndroid.RESULTS.GRANTED) {
          const bluetoothScanGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            permissions,
          );
          if (bluetoothScanGranted === PermissionsAndroid.RESULTS.GRANTED) {
            scanDevices();
          }
        } else {
          Alert.alert('Bluetooth Permission Denied');
          // ignore akses ditolak
          setBleOpend(false);
        }
      }
      blueTooth();
    } catch (err) {
      console.warn(err);
    }
  }, [scanDevices]);

  const scanBluetoothDevice = async () => {
    console.log('e');
    setLoading(true);
    try {
      const request = await requestMultiple([
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]);
      if (
        request['android.permission.ACCESS_FINE_LOCATION'] === RESULTS.GRANTED
      ) {
        scanDevices();
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setBleOpend(false);
      setLoading(false);
    }
  };

  const [connectLoader, setConnectLoader] = useState('');

  const connect = row => {
    if (connectLoader || screenLoader || loading) return;
    setConnectLoader(row.address);
    BluetoothManager.connect(row.address).then(
      s => {
        setConnectLoader('');
        Dispatch(setBoundAddress(row.address));
        Dispatch(setName(row.name || 'UNKNOWN'));
      },
      e => {
        setConnectLoader('');
        console.log(Object.keys(e));
        console.log(e?.nativeStackAndroid);
        console.log(e?.userInfo);
        console.log(e?.code);
        console.log(e?.message);

        alert(e?.message || 'Something Went Wrong' + 'Please Try Again Later');
      },
    );
  };
  return (
    <>
      {screenLoader || loading ? (
        <LoadingOverlay />
      ) : (
        <>
          <StatusBar backgroundColor={'#1ca3ac'} barStyle={'dark-content'} />
          <View
            style={{
              height: Platform.OS === 'ios' ? 180 : 120,
              backgroundColor: '#1ca3ac',
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}>
            <SafeAreaView>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 10,
                  marginTop: 20,
                }}>
                <Image
                  source={require('../../assets/profile-icon.png')}
                  style={{height: 80, width: 80}}
                />
                <View style={{marginLeft: 10}}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 18,
                    }}>
                    {' '}
                    {Cred.Name}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 18,
                    }}>
                    {' '}
                    <Feather name="map-pin" size={20} color="white" />{' '}
                    {Cred.workShopAddress
                      ? Cred.workShopAddress.length > 13
                        ? Cred.workShopAddress.substring(0, 10) + '...'
                        : Cred.workShopAddress
                      : ''}
                    {', '}
                    {Cred.City
                      ? Cred.length > 13
                        ? Cred.City.substring(0, 10) + '...'
                        : Cred.City
                      : ''}
                  </Text>
                </View>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            style={{flex: 1, marginHorizontal: 10, paddingBottom: 30}}>
            <TouchableOpacity
              onPress={() => setBleOpend(true)}
              style={{
                marginTop: 20,
                backgroundColor: 'palegoldenrod',
                padding: 10,
                borderRadius: 10,
                width: 200,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 20,
                }}>
                Connect Printer
              </Text>
            </TouchableOpacity>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <DashboardButton
                onPress={() => navigation.navigate('AllIroning')}
                text={'Ironing Orders'}
                image={require('../../assets/ironing.png')}
              />
              <DashboardButton
                onPress={() => navigation.navigate('AllDryClean')}
                text={'DryClean Orders'}
                image={require('../../assets/dry-clean.png')}
              />
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <DashboardButton
                onPress={() => navigation.navigate('AllCoupon')}
                text={'Coupon Generation'}
                image={require('../../assets/coupon.png')}
              />
              <DashboardButton
                onPress={() => navigation.navigate('AllConcern')}
                text={'User\nConcern'}
                image={require('../../assets/concern.png')}
              />
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <DashboardButton
                onPress={() => navigation.navigate('Ads')}
                text={'Ads\nManage'}
                image={require('../../assets/ads.png')}
              />
              <DashboardButton
                onPress={() => navigation.navigate('SalesDashboard')}
                text={'Sales\nAnalytic'}
                image={require('../../assets/sales.png')}
              />
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:10}}>
            <DashboardButton
              onPress={() => navigation.navigate('CreateOrder')}
              text={'Create\nOrder'}
              image={require('../../assets/create-order.png')}
            />
            <DashboardButton
              onPress={() => navigation.navigate('RiderManagement')}
              text={'Rider\nManagement'}
              image={require('../../assets/delivery.png')}
            />
            </View>
           
          </KeyboardAwareScrollView>
          <Modal
            transparent
            visible={bleOpend}
            onRequestClose={() => setBleOpend(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.4)',
              }}>
              <View
                style={{
                  width: '80%',
                  borderRadius: 10,
                  backgroundColor: 'white',
                  padding: 20,
                  height: '40%',
                }}>
                <MaterialIcons
                  name="cancel"
                  size={30}
                  color="black"
                  onPress={() => setBleOpend(false)}
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                  }}
                />
                <Text
                  onPress={() => scanBluetoothDevice()}
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 16,
                    textAlign: 'center',
                    color: 'black',
                    backgroundColor: 'skyblue',
                    borderRadius: 10,
                    marginBottom: 10,
                    marginTop: 30,
                  }}>
                  Scan Again Bluetooth Device
                </Text>
                <FlatList
                  data={pairedDevices}
                  renderItem={({item, index}) => (
                    <ItemList
                      key={index}
                      onPress={() => connect(item)}
                      label={item.name}
                      value={item.address}
                      connected={
                        item.address === ConnectedBluetoothDevice?.boundAddress
                      }
                      actionText="Connect"
                      color="#00BCD4"
                      connectLoader={connectLoader === item.address}
                    />
                  )}
                />
              </View>
            </View>
          </Modal>
        </>
      )}
    </>
  );
};

export default Dashboard;
