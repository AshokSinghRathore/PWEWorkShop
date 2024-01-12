import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IroningStyles } from '../Orders/Ironing/AllIroning';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../../../constants/color';

const Ads = ({ navigation }) => {
    const [googleAds,setGoogleAds] = useState(false)
    const [nonGoogleAds,setNonGoogleAds] = useState(true)
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView bounces={false} style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Manage Ads</Text>
        </View>
            <TouchableOpacity onPress={()=>{
                setGoogleAds(!googleAds);
                setNonGoogleAds(!nonGoogleAds)
            }} style={[IroningStyles.IroningContainer,{flexDirection:"row",justifyContent:"space-around",marginTop:100},googleAds&&{backgroundColor:"green"}]}>
                <Image source={require("../../../assets/google-ads.png")} resizeMode='contain' style={{width:100,height:100}} />
                <Text style={{fontSize:30,color:googleAds?"white": "black",fontFamily:"Poppins-Bold",alignSelf:"center"}}>Google Ads</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                setGoogleAds(!googleAds);
                setNonGoogleAds(!nonGoogleAds)
            }} style={[IroningStyles.IroningContainer,{flexDirection:"row",justifyContent:"space-around",marginTop:100},nonGoogleAds&&{backgroundColor:"green"}]}>
                <Image source={require("../../../assets/3rd-party-ad.png")} resizeMode='contain' style={{width:100,height:100}} />
                <Text style={{fontSize:30,color: nonGoogleAds?"white": "black",fontFamily:"Poppins-Bold",alignSelf:"center"}}>3rd Party Ads</Text>
            </TouchableOpacity>
     </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: AppColors.statusBarColor,
    flex: 1,
  },
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  heading: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
  addButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 5,
    elevation: 5,
  },  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 5,
    elevation: 5,

  }
});

export default Ads;
