import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {IroningStyles} from '../Orders/Ironing/AllIroning';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesgin from 'react-native-vector-icons/AntDesign';
import {AppColors} from '../../../constants/color';

const AllBill = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView bounces={false} style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>All User FeedBacks</Text>
        </View>

        <View style={IroningStyles.IroningContainer}>
          <Text style={IroningStyles.HighlighText}>
            Name :- <Text style={IroningStyles.ValueText}>Stoick The Vast</Text>
          </Text>
          <Text style={IroningStyles.HighlighText}>
            Order ID :-{' '}
            <Text style={IroningStyles.ValueText}>hdodweE34545e</Text>
          </Text>
          <Text style={IroningStyles.HighlighText}>
            Date :- <Text style={IroningStyles.ValueText}> 20-02-2033</Text>
          </Text>
          <AntDesgin name="star" color={'orange'} size={23}> <AntDesgin name="star" color={'orange'} size={23}/> <AntDesgin name="star" color={'orange'} size={23}/> <AntDesgin name="star" color={'orange'} size={23}/> <AntDesgin name="staro" color={'orange'} size={23}/></AntDesgin>
          <Text style={[IroningStyles.HighlighText, IroningStyles.ValueText]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            sed leo mauris. Mauris erat lorem, tempor eu lobortis sit amet,
            maximus at nulla. Aliquam a bibendum tellus. Curabitur eu gravida
            ante. Vivamus ac risus pulvinar, placerat odio sit amet, ornare
            eros.
          </Text>
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
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 5,
    elevation: 5,
  },
});

export default AllBill;
