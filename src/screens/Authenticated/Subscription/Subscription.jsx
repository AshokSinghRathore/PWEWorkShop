import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IroningStyles } from '../Orders/Ironing/AllIroning';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../../../constants/color';

const Subscription = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView bounces={false} style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Subscriptions</Text>
        
        </View>

        <View style={{flex:1,alignItems:"center",justifyContent:"center",marginTop:100,width:"100%"}}>
        <View style={[IroningStyles.IroningContainer,{width:"80%"}]}>
          <Text style={IroningStyles.HighlighText}>
            Monthly :-{' '}
            <Text style={IroningStyles.ValueText}>999 INR</Text>
          </Text>
        
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginHorizontal: 10,
            }}>
            <Ionicons name="pencil-sharp" color="green" size={30} />
           
          </View>
        </View>
        <View style={[IroningStyles.IroningContainer,{width:"80%"}]}>
          <Text style={IroningStyles.HighlighText}>
            Semi Annual :-{' '}
            <Text style={IroningStyles.ValueText}>2499 INR</Text>
          </Text>
        
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginHorizontal: 10,
            }}>
            <Ionicons name="pencil-sharp" color="green" size={30} />
           
          </View>
        </View>
        <View style={[IroningStyles.IroningContainer,{width:"80%"}]}>
          <Text style={IroningStyles.HighlighText}>
             Annual :-{' '}
            <Text style={IroningStyles.ValueText}>3999 INR</Text>
          </Text>
        
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginHorizontal: 10,
            }}>
            <Ionicons name="pencil-sharp" color="green" size={30} />
           
          </View>
        </View>

        </View>
      </KeyboardAwareScrollView>
      {/* <TouchableOpacity onPress={()=>navigation.navigate("AddCoupon")} style={styles.floatingButton}>
        <Ionicons name="add" size={40} color={AppColors.statusBarColor} />
      </TouchableOpacity> */}
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

export default Subscription;
