import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IroningStyles } from '../Orders/Ironing/AllIroning';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../../../constants/color';

const AllConcern = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView bounces={false} style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>All Concern</Text>
        
        </View>

        <View style={IroningStyles.IroningContainer}>
          <Text style={IroningStyles.HighlighText}>
            Concern By :-{' '}
            <Text style={IroningStyles.ValueText}>Alex</Text>
          </Text>
          <Text style={IroningStyles.HighlighText}>
            Date :-{' '}
            <Text style={IroningStyles.ValueText}> 22-02-2023</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
             
            }}
            style={styles.viewButton}
          >
            <Text style={styles.viewButtonText}>View & Reply</Text>
          </TouchableOpacity>
        </View>
        <View style={IroningStyles.IroningContainer}>
          <Text style={IroningStyles.HighlighText}>
            Concern By :-{' '}
            <Text style={IroningStyles.ValueText}>Alex</Text>
          </Text>
          <Text style={IroningStyles.HighlighText}>
            Date :-{' '}
            <Text style={IroningStyles.ValueText}> 22-02-2023</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailedIroningOrder');
            }}
            style={styles.viewButton}
          >
            <Text style={styles.viewButtonText}>View & Reply</Text>
          </TouchableOpacity>
        </View>
       
      </KeyboardAwareScrollView>
      <TouchableOpacity  style={styles.floatingButton}>
        <Ionicons name="add" size={40} color={AppColors.statusBarColor} />
      </TouchableOpacity>
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
  },   viewButton: {
    padding: 10,
    borderWidth: 1,
    width: 150,
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: 'black',
  },
  viewButtonText: {
    textAlign: 'right',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default AllConcern
