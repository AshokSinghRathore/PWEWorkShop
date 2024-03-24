import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
const Dashboard = ({navigation}) => {
  const Cred = useSelector(state => state.Cred);
  const Dispatch = useDispatch();
  const [screenLoader, setScreenLoader] = useState(false);

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
  return (
    <>
      {screenLoader ? (
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
            style={{flex: 1, marginHorizontal: 10}}>
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
                onPress={() => navigation.navigate('AllBill')}
                text={'Bill\nPrinting'}
                image={require('../../assets/bill.png')}
              />
              <DashboardButton
                onPress={() => navigation.navigate('Ads')}
                text={'Ads\nManage'}
                image={require('../../assets/ads.png')}
              />
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <DashboardButton
                onPress={() => navigation.navigate('AllFeedback')}
                text={'User\nFeedbacks'}
                image={require('../../assets/review.png')}
              />
              <DashboardButton
                onPress={() => navigation.navigate('Subscription')}
                text={'Subscription\nEdit'}
                image={require('../../assets/membership.png')}
              />
            </View>
            <Text style={{color: 'white', marginTop: 10}}>Invisible</Text>
          </KeyboardAwareScrollView>
        </>
      )}
    </>
  );
};

export default Dashboard;
