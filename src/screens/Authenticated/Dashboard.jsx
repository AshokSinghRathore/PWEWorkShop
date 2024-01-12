import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Feather from 'react-native-vector-icons/Feather';
import DashboardButton from '../../components/DashboardButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Dashboard = ({navigation}) => {
  return (
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
          onPress={()=>navigation.navigate("EditProfile")}
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
                Hiccup Haddock
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 18,
                }}>
                {' '}
                <Feather name="map-pin" size={20} color="white" /> South City,
                Gurgaon
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
          <DashboardButton onPress={()=>navigation.navigate("AllIroning")} text={"Ironing Orders"} image={require("../../assets/ironing.png")}/>
          <DashboardButton onPress={()=>navigation.navigate("AllDryClean")} text={"DryClean Orders"} image={require("../../assets/dry-clean.png")}/>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <DashboardButton onPress={()=>navigation.navigate("AllCoupon")} text={"Coupon Generation"} image={require("../../assets/coupon.png")}/>
          <DashboardButton onPress={()=>navigation.navigate("AllConcern")} text={"User\nConcern"} image={require("../../assets/concern.png")}/>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <DashboardButton onPress={()=>navigation.navigate("AllBill")}  text={"Bill\nPrinting"} image={require("../../assets/bill.png")}/>
          <DashboardButton onPress={()=>navigation.navigate("Ads")} text={"Ads\nManage"} image={require("../../assets/ads.png")}/>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <DashboardButton onPress={()=>navigation.navigate("AllFeedback")} text={"User\nFeedbacks"} image={require("../../assets/review.png")}/>
          <DashboardButton onPress={()=>navigation.navigate("Subscription")} text={"Subscription\nEdit"} image={require("../../assets/membership.png")}/>
        </View>
        <Text style={{color:"white",marginTop:10}}>Invisible</Text>
       
     
      </KeyboardAwareScrollView>
    </>
  );
};

export default Dashboard;
